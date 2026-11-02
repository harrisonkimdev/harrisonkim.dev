import { getFirestoreDb } from './firebase'

export type ContactMessage = {
  _id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export async function saveMessage(input: Pick<ContactMessage, 'name' | 'email' | 'message'>) {
  const data = { ...input, read: false, createdAt: new Date().toISOString() }
  const ref = await getFirestoreDb().collection('contactMessages').add(data)
  return ref.id
}

export async function listMessages(): Promise<ContactMessage[]> {
  const snapshot = await getFirestoreDb().collection('contactMessages').orderBy('createdAt', 'desc').limit(100).get()
  return snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as ContactMessage))
}

export async function markMessage(id: string, read: boolean) {
  const db = getFirestoreDb()
  const ref = db.collection('contactMessages').doc(id)
  return db.runTransaction(async transaction => {
    if (!(await transaction.get(ref)).exists) return false
    transaction.update(ref, { read })
    return true
  })
}
