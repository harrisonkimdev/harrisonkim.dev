import { Schema, model, models, Document } from 'mongoose'
// import { commentSchema } from './comment'

export interface Comment {
  writer: string;
  comment: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogDocument extends Document {
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<Comment>({
  writer: {
    type: String,
    required: [true, 'Commenter name is required']
  },
  comment: {
    type: String,
    required: [true, 'Comment text is required']
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  updatedAt: {
    type: Date,
    default: () => new Date()
  }
})

const blogSchema = new Schema<BlogDocument>({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date()
  },
  updatedAt: {
    type: Date,
    default: () => new Date()
  }
}, {
  timestamps: true
})

// Create a text index for search functionality
blogSchema.index({ 
  title: 'text', 
  content: 'text',
  tags: 'text' 
})

// Static method to find blogs by tag
blogSchema.statics.findByTag = function(tag: string) {
  return this.find({ tags: { $in: [tag] } }).sort({ createdAt: -1 })
}

// Virtual for generating excerpts
blogSchema.virtual('autoExcerpt').get(function() {
  if (this.excerpt) return this.excerpt
  if (!this.content) return ''
  
  // Create an excerpt from content
  return this.content.length > 150
    ? `${this.content.substring(0, 150)}...`
    : this.content
})

const Blog = models.Blog || model<BlogDocument>('Blog', blogSchema)

export default Blog