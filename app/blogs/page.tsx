import React from 'react'
import { IBlog } from '@/interfaces'

// components
import Blog from './Blog'
import PaginationNavigator from '@/components/PaginationNavigator'

const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/blogs?currentPage=${1}`, {
      cache: 'no-store'
    })
    const data = await res.json()
    return data.blogs
  } catch (err) {
    // 
  }
}

const Blogs = async () => {
  const blogs = await getBlogs()

  return (
    <>
      <div className='flex flex-col gap-3 md:gap-2 mt-1'>
        { blogs?.map((blog: IBlog) => (
          <Blog blogData={blog} key={blog._id} />
        )) }
      </div>

      <PaginationNavigator />
    </>
  )
}

export default Blogs