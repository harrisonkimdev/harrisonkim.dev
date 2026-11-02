import bcrypt from 'bcryptjs'
import { createHash } from 'node:crypto'
import type { DocumentSnapshot, Query } from '@google-cloud/firestore'
import type { IBlog, IComment } from '@/interfaces'
import { getFirestoreDb } from './firebase'

const passwordDigest = (password: string) => createHash('sha256').update(password).digest('base64')

type BlogInput = Pick<IBlog, 'title' | 'content' | 'tags'>
type CommentRecord = IComment & { passwordHash: string }

function publicBlog(document: DocumentSnapshot): IBlog {
  const data = document.data()!
  return {
    _id: document.id, title: data.title, content: data.content, tags: data.tags ?? [],
    createdAt: data.createdAt, updatedAt: data.updatedAt, comments: [],
  }
}

function publicComment(document: DocumentSnapshot): IComment {
  const data = document.data()!
  return { _id: document.id, writer: data.writer, comment: data.comment, createdAt: data.createdAt, updatedAt: data.updatedAt }
}

export async function listBlogs({ query: search, tag, page, pageSize }: { query: string; tag: string; page: number; pageSize: number }) {
  let query: Query = getFirestoreDb().collection('blogs')
  if (tag) query = query.where('tags', 'array-contains', tag)
  query = query.orderBy('createdAt', 'desc')
  let blogs: IBlog[]
  let total: number
  if (search) {
    // Firestore has no substring search; a personal blog's matching posts are filtered on the server.
    const needle = search.toLocaleLowerCase()
    const snapshot = await query.get()
    const matches = snapshot.docs.map(publicBlog).filter(blog => [blog.title, blog.content, ...blog.tags].some(value => value.toLocaleLowerCase().includes(needle)))
    total = matches.length
    blogs = matches.slice((page - 1) * pageSize, page * pageSize)
  } else {
    const [count, snapshot] = await Promise.all([query.count().get(), query.offset((page - 1) * pageSize).limit(pageSize).get()])
    total = count.data().count
    blogs = snapshot.docs.map(publicBlog)
  }
  const totalPages = Math.ceil(total / pageSize)
  return { blogs, pagination: { total, totalPages, currentPage: page, pageSize, hasNextPage: page < totalPages, hasPrevPage: page > 1 } }
}

export async function getBlog(id: string) {
  const ref = getFirestoreDb().collection('blogs').doc(id)
  const snapshot = await ref.get()
  if (!snapshot.exists) return null
  const comments = await ref.collection('comments').orderBy('createdAt', 'asc').get()
  return { ...publicBlog(snapshot), comments: comments.docs.map(publicComment) }
}

export async function createBlog(input: BlogInput) {
  const now = new Date().toISOString()
  const data = { ...input, createdAt: now, updatedAt: now }
  const ref = await getFirestoreDb().collection('blogs').add(data)
  return { ...data, _id: ref.id, comments: [] } satisfies IBlog
}

export async function updateBlog(id: string, input: BlogInput) {
  const db = getFirestoreDb()
  const ref = db.collection('blogs').doc(id)
  return db.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref)
    if (!snapshot.exists) return false
    transaction.update(ref, { ...input, updatedAt: new Date().toISOString() })
    return true
  })
}

export async function deleteBlog(id: string) {
  const db = getFirestoreDb()
  const ref = db.collection('blogs').doc(id)
  if (!(await ref.get()).exists) return false
  await db.recursiveDelete(ref)
  return true
}

export async function addComment(blogId: string, input: { writer: string; comment: string; password: string }) {
  const db = getFirestoreDb()
  const parent = db.collection('blogs').doc(blogId)
  const ref = parent.collection('comments').doc()
  const now = new Date().toISOString()
  const record: Omit<CommentRecord, '_id'> = {
    writer: input.writer, comment: input.comment, passwordHash: await bcrypt.hash(passwordDigest(input.password), 12), createdAt: now, updatedAt: now,
  }
  return db.runTransaction(async transaction => {
    if (!(await transaction.get(parent)).exists) return false
    transaction.create(ref, record)
    return true
  })
}

export async function deleteComment(blogId: string, id: string, password: string) {
  const db = getFirestoreDb()
  const ref = db.collection('blogs').doc(blogId).collection('comments').doc(id)
  return db.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref)
    if (!snapshot.exists) return 'not_found'
    if (!await bcrypt.compare(passwordDigest(password), snapshot.data()!.passwordHash)) return 'forbidden'
    transaction.delete(ref)
    return 'deleted'
  })
}
