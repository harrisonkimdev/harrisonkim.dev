"use client"

import React, { useState, useEffect } from 'react'
import { IBlog } from '@/interfaces'

import Blog from './components/Blog'
import PaginationNavigator from '@/components/PaginationNavigator'
import SearchBar from '@/components/SearchBar'

const BlogIndex = () => {
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
        <div className='min-h-screen'>
            <SearchBar searchSubmit={(searchQuery: string) => handleSubmit(searchQuery)} />
                
            <div className='
                my-8 grid grid-col-1 gap-8 sm:grid-cols-2 sm:gap-4
            '>
                { blogData?.map((blog: IBlog) => <Blog blogData={blog} key={blog._id} />) }
            </div>

            {/* { blogData && blogData.length > 0 && (
                <div className='flex flex-col justify-end'>
                    <PaginationNavigator />
                </div>
            )} */}
        </div>
    )
}

export default BlogIndex