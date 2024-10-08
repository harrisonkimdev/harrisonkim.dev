export interface IComment {
  _id: string
  writer: string
  comment: string
  password: string
  createdAt: string
  updatedAt: string
}
export interface IBlog {
  _id: string
  title: string
  content: string
  tags: string[]
  comments: IComment[]
  createdAt: string
  updatedAt: string
}
