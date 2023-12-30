"use client"

import React from 'react'
import { IBlog } from '@/interfaces'

import Blog from './components/Blog'
import PaginationNavigator from '@/components/PaginationNavigator'
import SearchBar from '@/components/SearchBar'

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

    const handleSubmit = async (query: string) => {
        // const res = await fetch(`${process.env.BASE_URL}/api/blogs?search=${query}`, {

        // })
        // const data = await res.json()
    }

    return (
        <div className='min-h-[600px] grid grid-rows-6'>
            <div className='row-span-5'>
                <SearchBar searchSubmit={(searchQuery: string) => handleSubmit(searchQuery)} />
            



                <div className='flex flex-col gap-3 md:gap-2 mt-1'>
                    { blogs?.map((blog: IBlog) => <Blog blogData={blog} key={blog._id} />) }
                </div>
            </div>

            <div className='row-start-6 row-span-1 flex flex-col justify-center'>
                <PaginationNavigator />
            </div>
        </div>
    )
}

export default Blogs