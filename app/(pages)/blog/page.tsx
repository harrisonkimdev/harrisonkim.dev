"use client"

import React, { useState, useEffect } from 'react'
import { IBlog } from '@/interfaces'

import Blog from './components/Blog'
import PaginationNavigator from '@/components/PaginationNavigator'
import SearchBar from '@/components/SearchBar'

const BlogIndexPage = () => {
  const [blogData, setBlogData] = useState<IBlog[] | undefined>(undefined)

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch(`/api/blog?currentPage=${1}`)
        const data = await res.json()
        setBlogData(data.blog)
      } catch (err) {
        // 
      }
    }
    getBlogs()
  }, [])
  

  const handleSubmit = async (query: string) => {
    const res = await fetch(`/api/blog?search=${query}`)
    const data = await res.json()
  }

  return (
    <>
      {/* <SearchBar searchSubmit={(searchQuery: string) => handleSubmit(searchQuery)} /> */}
      <div>   
        { blogData && blogData.length > 0 ? (
          <div className='
            my-8 grid grid-col-1 gap-8 sm:grid-cols-2 sm:gap-4
          '>
            { blogData?.map((blog: IBlog) => <Blog blogData={blog} key={blog._id} />) }
          </div>
        ) : (
          <div className='my-8 text-2xl text-center'>No Blog Posts Just Yet...</div>
        )}
      </div>

      {/* { blogData && blogData.length > 0 && (
        <div className='flex flex-col justify-end'>
          <PaginationNavigator />
        </div>
      )} */}
    </>
  )
}

export default BlogIndexPage