import { Schema, model, models } from 'mongoose'

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
  },
  writer: {
    type: String,
    required: [true, 'Writer is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  }
})

const blog = models.blog || model("blog", blogSchema)

export default blog