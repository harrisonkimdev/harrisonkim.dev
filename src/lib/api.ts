import { NextResponse } from 'next/server'

export class RequestError extends Error {
  constructor(message: string, public status = 400) { super(message) }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  let value: unknown
  try { value = await request.json() } catch { throw new RequestError('Invalid JSON body.') }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new RequestError('Expected a JSON object.')
  return value as Record<string, unknown>
}

export function stringField(data: Record<string, unknown>, key: string, max: number) {
  const value = data[key]
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw new RequestError(`Invalid ${key}.`)
  return value.trim()
}

export function documentId(id: string) {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) throw new RequestError('Invalid document id.')
  return id
}

export function blogInput(data: Record<string, unknown>) {
  const title = stringField(data, 'title', 500)
  const content = stringField(data, 'content', 200000)
  const tags = data.tags ?? []
  if (!Array.isArray(tags) || tags.length > 5 || tags.some(tag => typeof tag !== 'string' || !tag.trim() || tag.length > 100)) {
    throw new RequestError('Invalid tags.')
  }
  return { title, content, tags: Array.from(new Set((tags as string[]).map(tag => tag.trim()))) }
}

export function apiError(error: unknown, message: string) {
  if (error instanceof RequestError) return NextResponse.json({ message: error.message, error: error.message }, { status: error.status })
  console.error(message, error instanceof Error ? error.name : 'Unknown error')
  return NextResponse.json({ message, error: message }, { status: 500 })
}
