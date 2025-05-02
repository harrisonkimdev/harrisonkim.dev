"use client"

import { useState, useEffect } from "react"
import { FiCalendar, FiClock, FiSearch } from "react-icons/fi"
import BlogCard from "@/components/blogs/BlogCard"

interface Blog {
  _id: string
  title: string
  content: string
  excerpt?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/blogs")
        const data = await res.json()
        
        if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs)
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBlogs()
  }, [])
  
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (blog.content && blog.content.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex flex-col">
      <h1 className="section-title text-3xl">Blog</h1>
      
      <div className="relative mt-6 mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 bg-accent border border-gray-800 rounded-md focus:outline-none focus:border-primary"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-mono text-primary mb-2">No blog posts found</h3>
          <p className="text-gray-400">
            {searchQuery 
              ? "Try a different search query"
              : "I'm working on new content. Check back soon!"}
          </p>
        </div>
      )}
    </div>
  )
}

export default BlogsPage