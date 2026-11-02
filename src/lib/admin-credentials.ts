import bcrypt from 'bcryptjs'

export async function authenticateAdmin(password: unknown) {
  const configuredPassword = process.env.ADMIN_PASSWORD
  if (typeof password !== 'string' || !password || !configuredPassword) return null

  const hash = await bcrypt.hash(configuredPassword, await bcrypt.genSalt())
  if (!await bcrypt.compare(password, hash)) return null

  return { id: '1', name: 'Harrison Kim', email: 'harrisonkimdev@gmail.com' }
}
