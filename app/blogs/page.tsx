"use client"

import React from 'react'
import { IBlog } from '@/interfaces'

import Blog from './components/Blog'
import PaginationNavigator from '@/components/PaginationNavigator'
import SearchBar from '@/components/SearchBar'

const getBlogs = async () => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/blogs?currentPage=${1}`)
        const data = await res.json()
        return data.blogs
    } catch (err) {
        // 
    }
}

const Blogs = () => {
    // const blogs = await getBlogs()
    const blogs = [
        {
            _id: '1',
            title: 'first blog title',
            content: 'first blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog content',
            writer: 'first blog writer',
            password: 'first blog password',
            createdAt: '2024-01-05',
            updatedAt: '2024-01-05',
        },
        {
            _id: '2',
            title: 'second blog title',
            content: 'second blog content',
            writer: 'second blog writer',
            password: 'second blog password',
            createdAt: '2024-01-05',
            updatedAt: '2024-01-05',
        },
        {
            _id: '3',
            title: 'third blog title',
            content: 'third blog content',
            writer: 'third blog writer',
            password: 'third blog password',
            createdAt: '2024-01-05',
            updatedAt: '2024-01-05',
        },
        {
            _id: '4',
            title: 'fourth blog title',
            content: 'fourth blog content',
            writer: 'fourth blog writer',
            password: 'fourth blog password',
            createdAt: '2024-01-05',
            updatedAt: '2024-01-05',
        }
    ]

    const handleSubmit = async (query: string) => {
        const res = await fetch(`${process.env.BASE_URL}/api/blogs?search=${query}`)
        const data = await res.json()
    }

    return (
        <div className='min-h-screen'>
            <SearchBar searchSubmit={(searchQuery: string) => handleSubmit(searchQuery)} />
                
            <div className='
                my-8 grid grid-col-1 gap-8 sm:grid-cols-2 sm:gap-4
            '>
                { blogs?.map((blog: IBlog) => <Blog blogData={blog} key={blog._id} />) }
            </div>

            { blogs.length > 0 && (
                <div className='flex flex-col justify-end'>
                    <PaginationNavigator />
                </div>
            )}
        </div>
    )
}

export default Blogs