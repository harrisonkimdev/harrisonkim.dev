export interface IComment {
    _id: string
    writer: string
    comment: string
    password: string
    createdAt: Date
    updatedAt: Date
}
export interface IBlog {
    _id: string
    title: string
    content: string
    tags: string[]
    comments: IComment[]
    createdAt: Date
    updatedAt: Date
}
