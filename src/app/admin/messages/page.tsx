'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ContactMessage } from '@/lib/messages-store'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const response = await fetch('/api/contact', { signal: controller.signal })
        if (!response.ok) throw new Error(response.status === 403 ? 'Sign in as the site owner to view messages.' : 'Unable to load messages.')
        const data = await response.json()
        setMessages(data.messages)
      } catch (error) {
        if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Unable to load messages.')
      } finally { if (!controller.signal.aborted) setLoading(false) }
    }
    void load()
    return () => controller.abort()
  }, [])

  async function toggleRead(message: ContactMessage) {
    setUpdating(message._id)
    setError('')
    try {
      const response = await fetch(`/api/contact/${message._id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read: !message.read }),
      })
      if (!response.ok) throw new Error('Unable to update message.')
      setMessages(current => current.map(item => item._id === message._id ? { ...item, read: !item.read } : item))
    } catch (error) { setError(error instanceof Error ? error.message : 'Unable to update message.') }
    finally { setUpdating(null) }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-medium">Contact messages</h1>
        <div className="flex gap-4 text-lime-400 underline">
          <Link href="/admin/blogs">Manage blogs</Link>
          <Link href="/login">Sign in</Link>
        </div>
      </div>
      <p className="text-gray-400">Latest 100 messages submitted through the contact form.</p>
      {loading && <p>Loading messages...</p>}
      {error && <p role="alert" className="text-red-300">{error}</p>}
      {!loading && !error && !messages.length && <p>No messages yet.</p>}
      {messages.map(message => (
        <article key={message._id} className="space-y-3 rounded-lg border border-gray-700 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{message.name}</h2>
            <span className="text-sm text-gray-400">{message.read ? 'Read' : 'Unread'}</span>
          </div>
          <a href={`mailto:${message.email}`} className="text-lime-400 underline">{message.email}</a>
          <p className="whitespace-pre-wrap break-words">{message.message}</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <time dateTime={message.createdAt} className="text-sm text-gray-400">{new Date(message.createdAt).toLocaleString()}</time>
            <button type="button" disabled={updating === message._id} onClick={() => toggleRead(message)} className="rounded border border-gray-600 px-3 py-2 disabled:opacity-50">
              {updating === message._id ? 'Saving...' : message.read ? 'Mark unread' : 'Mark read'}
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
