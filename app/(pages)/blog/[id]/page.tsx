'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { FaAngleLeft } from "react-icons/fa6";

import { IBlog } from '@/interfaces';

import Loader from '@/components/Loader'
import Comments from '@/(pages)/blog/(components)/Comments';

const BlogShowPage = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(false)
  const [blog, setBlog] = useState<IBlog | undefined>(undefined)

  const fetchBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}?readOnly=1`)
      const data = await res.json()
      setBlog(data.blog)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)

    fetchBlog(params.id)
  }, [])
  

  const convertDate = (dateInString: string | undefined) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    
    if (dateInString) {
      const date = new Date(dateInString)

      const day = date.getDate()
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      const hours = (date.getHours() % 12) || 12 // Convert to 12-hour format
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const period = date.getHours() < 12 ? 'AM' : 'PM'
      
      return `${month} ${day}, ${year} ${hours}:${minutes} ${period}`
    }
  }

  if (loading) return (
    <>
      <Loader />
    </>
  )

  else return (
    <>
      <Link href='/blog' className='w-min flex justify-between'>
        <FaAngleLeft className='rounded-md text-black hover:border' />
      </Link>

      {/* image and title */}
      <div className='mt-8 relative'>
        <Image 
          src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Blog Image"
          width={1470}
          height={980}
          className='object-cover absolute h-[200px]'
        />
        <h1 className='
          absolute top-0 left-0 right-0 z-10
          h-[200px] m-0 ml-12 flex items-center
          text-stone-50
        '>{ blog?.title }</h1>
      </div>

      {/* writer and created at */}
      <div className='pt-[215px] text-stone-600'>
        <p>{ convertDate(blog?.createdAt) }</p>
      </div>

      {/* content */}
      { blog && (
        <div dangerouslySetInnerHTML={{ __html: blog?.content }} className='pt-4 text-stone-600' />
      )}

      {/* reply section */}
      <div className='mt-12'>
        <Comments
          blogId={blog?._id} comments={blog?.comments}
          fetchComments={() => fetchBlog(params.id)}
        />
      </div>
    </>
  )
}

export default BlogShowPage