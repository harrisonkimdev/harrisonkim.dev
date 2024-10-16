"use client"

import { IBlog } from "@/interfaces"
import { useState, useEffect } from "react"
import Blog from "./(components)/Blog"

const BlogIndexPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<string>("4")
  const [blogs, setBlogs] = useState<IBlog[] | undefined>(undefined)

  const fetchBlogs = async (searchQuery: string = "") => {
    try {
      const params = new URLSearchParams({
        currentPage: currentPage.toString(),
        pageSize,
        ...(searchQuery && { searchQuery })
      })
      const res = await fetch(`/api/blogs?${params}`)
      const { blogs, lastPage } = await res.json()
      setBlogs(blogs)
      setLastPage(lastPage)
    } catch (err: any) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [currentPage, pageSize])

  const handleSearch = (searchQuery: string) => {
    fetchBlogs(searchQuery)
  }

  return (
    <>
      {/* { blogs && blogs?.length > 0 ? ( */}
      { 1 ? (
        <>
          <h2 className="
            font-mono font-light text-center text-lime-400
          "> Blogs </h2>
          <div className="
            my-8 grid
            grid-col-1 sm:grid-cols-2
            gap-8 sm:gap-4
          ">
            { blogs?.map((blog: IBlog) => <Blog blogData={blog} key={blog._id} />) }
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