import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { once } from 'node:events'
import { access } from 'node:fs/promises'
import { createServer } from 'node:net'
import { createRequire } from 'node:module'
import { setTimeout as delay } from 'node:timers/promises'
import { Firestore } from '@google-cloud/firestore'

const require = createRequire(import.meta.url)
const projectId = process.env.GCLOUD_PROJECT || ''
assert.ok(projectId.startsWith('demo-') && /^127\.0\.0\.1:\d+$/.test(process.env.FIRESTORE_EMULATOR_HOST || ''), 'Integration tests require a loopback Firestore emulator and demo project.')
const database = new Firestore({ projectId })
await access('.next/BUILD_ID').catch(() => {
  throw new Error('Run npm run build before npm run test:integration.')
})

const listener = createServer()
listener.listen(0, '127.0.0.1')
await once(listener, 'listening')
const port = listener.address().port
await new Promise((resolveClose, reject) => listener.close(error => error ? reject(error) : resolveClose()))
const origin = `http://127.0.0.1:${port}`
const password = randomBytes(24).toString('hex')
const cookies = new Map()
let app
let output = ''
let checks = 0

function recordCookies(response) {
  for (const header of response.headers.getSetCookie()) {
    const [name, ...value] = header.split(';')[0].split('=')
    cookies.set(name, value.join('='))
  }
}

async function request(path, { authenticated = false, ...options } = {}) {
  const headers = new Headers(options.headers)
  if (authenticated) headers.set('cookie', [...cookies].map(([name, value]) => `${name}=${value}`).join('; '))
  const response = await fetch(`${origin}${path}`, { ...options, headers, redirect: 'manual', signal: AbortSignal.timeout(15000) })
  recordCookies(response)
  return response
}

async function jsonRequest(path, method, body, status, authenticated = false) {
  const response = await request(path, {
    method, authenticated,
    headers: { 'content-type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  })
  assert.equal(response.status, status, `${method} ${path}: ${await response.clone().text()}`)
  checks++
  return response.json()
}

try {
  // Every external-service variable is overridden before Next loads .env.local.
  app = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    env: {
      ...process.env, NODE_ENV: 'production', NEXT_TELEMETRY_DISABLED: '1',
      FIREBASE_PROJECT_ID: projectId, FIREBASE_WIF_PROVIDER: '', FIREBASE_SERVICE_ACCOUNT_EMAIL: '', GOOGLE_APPLICATION_CREDENTIALS: '',
      NEXTAUTH_URL: origin, NEXTAUTH_URL_INTERNAL: origin, BASE_URL: origin,
      NEXTAUTH_SECRET: randomBytes(32).toString('hex'), ACCESS_TOKEN_SECRET: randomBytes(32).toString('hex'),
      ADMIN_PASSWORD: password,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  app.stdout.on('data', chunk => { output = (output + chunk).slice(-12000) })
  app.stderr.on('data', chunk => { output = (output + chunk).slice(-12000) })
  let started = false
  for (let attempt = 0; attempt < 100; attempt++) {
    if (app.exitCode !== null) throw new Error(`Next.js exited with ${app.exitCode}`)
    try {
      const response = await request('/api/auth/csrf')
      if (response.ok) { started = true; break }
    } catch { /* Wait until the local server accepts connections. */ }
    await delay(100)
  }
  assert.ok(started, 'Local Next.js server did not start')

  const empty = await jsonRequest('/api/blogs', 'GET', undefined, 200)
  assert.equal(empty.blogs.length, 0, 'The test database must be empty')
  await jsonRequest('/api/blogs', 'POST', { title: 'Blocked', content: 'Blocked' }, 403)
  await jsonRequest('/api/login', 'POST', { password: 'wrong-password' }, 401)

  const csrf = await (await request('/api/auth/csrf')).json()
  const signIn = await request('/api/auth/callback/credentials', {
    method: 'POST', authenticated: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'x-auth-return-redirect': '1' },
    body: new URLSearchParams({ csrfToken: csrf.csrfToken, password, callbackUrl: `${origin}/admin/blogs`, json: 'true' }),
  })
  assert.equal(signIn.status, 200)
  const session = await (await request('/api/auth/session', { authenticated: true })).json()
  assert.equal(session.user?.email, 'harrisonkimdev@gmail.com', 'The real credentials sign-in must issue an owner session')
  checks++

  const original = { title: 'Integration original', content: '<p>Persisted <strong>HTML</strong></p>', tags: ['integration'] }
  const created = await jsonRequest('/api/blogs', 'POST', original, 201, true)
  const id = created.blog._id
  assert.match(id, /^[A-Za-z0-9]{20}$/)
  const saved = await jsonRequest(`/api/blogs/${id}`, 'GET', undefined, 200)
  assert.equal(saved.blog.content, original.content)
  assert.deepEqual(saved.blog.tags, original.tags)

  await jsonRequest(`/api/blogs/${id}`, 'PATCH', { title: 'Unauthorized change' }, 403)
  await jsonRequest(`/api/blogs/${id}`, 'DELETE', undefined, 403)
  const updated = { title: 'Integration updated', content: '<p>Updated HTML</p>', tags: ['updated'] }
  await jsonRequest(`/api/blogs/${id}`, 'PATCH', updated, 200, true)
  const readBack = await jsonRequest(`/api/blogs/${id}`, 'GET', undefined, 200)
  assert.equal(readBack.blog.title, updated.title)
  assert.equal(readBack.blog.content, updated.content)
  assert.deepEqual(readBack.blog.tags, updated.tags)
  const filtered = await jsonRequest('/api/blogs?query=updated&tag=updated', 'GET', undefined, 200)
  assert.equal(filtered.pagination.total, 1)
  assert.equal(filtered.blogs[0]._id, id)

  await jsonRequest('/api/comments', 'POST', { blogId: id, writer: 'Visitor', comment: 'Firestore comment', password: '가'.repeat(30) + 'A' }, 200)
  const commented = await jsonRequest(`/api/blogs/${id}`, 'GET', undefined, 200)
  assert.equal(commented.blog.comments.length, 1)
  const comment = commented.blog.comments[0]
  assert.equal(comment.writer, 'Visitor')
  assert.equal('password' in comment, false)
  assert.equal('passwordHash' in comment, false)
  const storedComment = await database.doc(`blogs/${id}/comments/${comment._id}`).get()
  assert.ok(storedComment.data().passwordHash.startsWith('$2'))
  await jsonRequest(`/api/comments/${comment._id}?blogId=${id}`, 'DELETE', { password: '가'.repeat(30) + 'B' }, 403)
  await jsonRequest(`/api/comments/${comment._id}?blogId=${id}`, 'DELETE', { password: '가'.repeat(30) + 'A' }, 200)
  // A child comment must not survive deletion of its parent blog.
  await jsonRequest('/api/comments', 'POST', { blogId: id, writer: 'Visitor', comment: 'Cascade check', password: 'secret' }, 200)
  await jsonRequest(`/api/blogs/${id}`, 'DELETE', undefined, 200, true)
  await jsonRequest(`/api/blogs/${id}`, 'GET', undefined, 404)
  const finalList = await jsonRequest('/api/blogs', 'GET', undefined, 200)
  assert.equal(finalList.pagination.total, 0)
  assert.equal((await database.collection(`blogs/${id}/comments`).get()).size, 0)
  await jsonRequest('/api/blogs?pageSize=-1', 'GET', undefined, 400)
  await jsonRequest('/api/contact', 'POST', { name: 'Visitor', email: 'bad-email', message: 'Invalid' }, 400)
  const contact = await jsonRequest('/api/contact', 'POST', { name: 'Visitor', email: 'integration@example.invalid', message: '<script>display as plain text</script>' }, 201)
  await jsonRequest('/api/contact', 'GET', undefined, 403)
  const inbox = await jsonRequest('/api/contact', 'GET', undefined, 200, true)
  assert.equal(inbox.messages[0]._id, contact.id)
  assert.equal(inbox.messages[0].read, false)
  await jsonRequest(`/api/contact/${contact.id}`, 'PATCH', { read: true }, 403)
  await jsonRequest(`/api/contact/${contact.id}`, 'PATCH', { read: true }, 200, true)
  assert.equal((await database.doc(`contactMessages/${contact.id}`).get()).data().read, true)
  const directRead = await fetch(`http://${process.env.FIRESTORE_EMULATOR_HOST}/v1/projects/${projectId}/databases/(default)/documents/contactMessages`)
  assert.equal(directRead.status, 403, 'Firestore rules must reject unauthenticated direct access to messages')
  checks++
  console.log(`Integration passed: ${checks} HTTP/auth/Firestore checks; no production data or email used.`)
} catch (error) {
  console.error(error.message)
  if (output) console.error(output.replaceAll(password, '[test password redacted]'))
  process.exitCode = 1
} finally {
  if (app && app.exitCode === null) {
    const exited = once(app, 'exit')
    app.kill('SIGTERM')
    const timer = setTimeout(() => app.kill('SIGKILL'), 5000)
    timer.unref()
    await exited
    clearTimeout(timer)
  }
  await database.terminate()
}
