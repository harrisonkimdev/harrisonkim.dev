"use client"

import React, { useState, useEffect } from 'react'
import { IBlog } from '@/interfaces'

import Loader from '@/components/Loader'
import Blog from './(components)/Blog'
import PaginationNavigator from '@/components/PaginationNavigator'
import SearchBar from '@/components/SearchBar'

const BlogIndexPage = () => {
  const [loading, setLoading] = useState(false)
  const [blogData, setBlogData] = useState<IBlog[] | undefined>(undefined)

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blog?currentPage=${1}`)
      const data = await res.json()
      setBlogData(data.blog)
    } catch (err: any) {
      console.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true);
    fetchBlog();
  }, [])
  

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length === 0) {
      fetchBlog();
      return;
    }
    setLoading (true);

    try {
      const res = await fetch(`/api/blog?searchQuery=${searchQuery}`);
      const data = await res.json();
      setBlogData(data.blog);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <>
      <Loader />
    </>
  )

  else return (
    <>
      <SearchBar searchSubmit={(searchQuery: string) => handleSearch(searchQuery)} />

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