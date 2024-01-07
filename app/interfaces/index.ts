export interface IBlog {
  _id: string
  title: string
  content: string
  tags: string[]
  comments: string[]
  createdAt: string
  updatedAt: string
}

export interface IComment {
  id: string
  writer: string
  content: string
  password: string
  createdAt: string
  updatedAt: string
}