'use client'

import { IBlog } from '@/interfaces'
import { useState, useEffect } from 'react'

import PaginationNavigator from '@/components/PaginationNavigator'
import SearchBar from '@/components/SearchBar'
import Blog from './_components/Blog'

const BlogIndexPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<string>('4')
  const [blogData, setBlogData] = useState<IBlog[] | undefined>(undefined)

  const fetchBlog = async () => {
    try {
      var currentPageString = currentPage.toString()
      const params = new URLSearchParams({
        currentPage: currentPageString,
        pageSize
      })
      const res = await fetch(`/api/blog?${params}`)
      const data = await res.json()
      setBlogData(data.blog)
      setLastPage(data.lastPage)
    } catch (err: any) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchBlog()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length === 0) {
      fetchBlog()
      return
    }

    try {
      var currentPageString = currentPage.toString()
      const params = new URLSearchParams({
        currentPageString,
        pageSize,
        searchQuery
      })
      const res = await fetch(`/api/blog?${params}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await res.json()
      setBlogData(data.blog)
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <>
      <SearchBar searchSubmit={(searchQuery: string) => handleSearch(searchQuery)} />

      <div className='mt-12'>
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

      { blogData && blogData.length > 0 && (
        <div className='mt-16 flex flex-col justify-end'>
          <PaginationNavigator
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={(pageNum: number) => setCurrentPage(pageNum)}
          />
        </div>
      )}
    </>
  )
}

export default BlogIndexPage