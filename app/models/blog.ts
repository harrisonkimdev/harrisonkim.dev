import { Schema, model, models } from 'mongoose'

const tagSchema = new Schema({
    title: String
})

const commentsSchema = new Schema({
    writer: String,
    content: String,
    password: String
})

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String
    },
    tags: [ tagSchema ],
    comments: [ commentsSchema ],
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

const Blog = models.blog || model("Blog", blogSchema)

export default Blog