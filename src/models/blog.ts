import { Schema, model, models } from 'mongoose'
// import { commentSchema } from './comment'

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String
  },
  tags: {
    type: [String],
  },
  // comments: [ commentSchema ],
  comments: [{
    writer: String,
    comment: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
  }],
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

const Blog = models.Blog || model('Blog', blogSchema)

export default Blog