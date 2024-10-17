"use client"

import { IBlog } from "@/interfaces"
import { useState, useEffect } from "react"
import Blog from "./(components)/Blog"

const BlogIndexPage = () => {
  const [blogs, setBlogs] = useState<IBlog[] | undefined>(undefined)

  useEffect(() => {
    const fetchBlogs = async (searchQuery: string = "") => {
      try {
        const params = new URLSearchParams({
          ...(searchQuery && { searchQuery })
        })
        const res = await fetch(`/api/blogs?${params}`)
        const { blogs } = await res.json()
        setBlogs(blogs)
      } catch (err: any) {
        console.error(err.message)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <>
      { blogs && blogs?.length > 0 ? (
        <>
          <h1 className="
            font-mono font-light text-center text-lime-400
          "> Blogs </h1>
          <div className="
            my-8 grid
            grid-col-1 sm:grid-cols-2
            gap-8 sm:gap-4
          ">
            { blogs?.map((blog: IBlog) => <Blog blog={blog} key={blog._id} />) }
          </div>
        </>
      ) : (
        <div className="
          h-full
          flex flex-col items-center justify-center
          font-mono whitespace-nowrap
          text-xl text-center text-lime-400
        ">
          No Blog Posts Yet...
        </div>
      )}
    </>
  )
}

export default BlogIndexPage