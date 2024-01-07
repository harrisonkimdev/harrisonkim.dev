export interface ITag {
    _id: string
    title: string
    createdAt: string
    updatedAt: string
}
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
    tags: ITag[]
    comments: IComment[]
    createdAt: string
    updatedAt: string
}
