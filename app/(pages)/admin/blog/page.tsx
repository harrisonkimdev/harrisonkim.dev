'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'

import { IBlog } from '@/interfaces'

import Table from '@/(pages)/admin/blog/components/Table'

const AdminBlogIndexPage = () => {
  const router = useRouter()

  const [blog, setBlog] = useState<IBlog[]>([])

  useEffect(() => {
    const fetchBlogData = async () => {
      const session = await getSession()
      if (session) {
        try {
          const res = await fetch('/api/blog', {
            method: 'GET',
          })
          const data = await res.json()
          setBlog(data.blog)
        } catch (err) {
          console.error(err)
        }
      } else {
        router.push('/')
      }
    }
    fetchBlogData()
  }, [])
  
  return (
    <>
      <h1 className='text-3xl font-medium'>Manage blog</h1>
      <div className='flex justify-end'>
        <Link href="/admin/blog/create" className='
          p-2 shadow-xl font-medium text-stone-800 hover:text-stone-800 bg-white hover:bg-stone-100
        '>Create</Link>
      </div>
      <div className='mt-8'>
        <Table data={blog} />
      </div>
    </>
  )
}

export default AdminBlogIndexPage