'use client'

import { IBlog } from '@/interfaces'

import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import Link from 'next/link'
import Table from '@/app/admin/blogs/(components)/Table'

const AdminBlogsIndexPage = () => {
  const router = useRouter()

  const [blogs, setBlogs] = useState<IBlog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const session = await getSession()
      if (session) {
        try {
          const res = await fetch('/api/blogs', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          const { blogs } = await res.json()
          setBlogs(blogs)
        } catch (err) {
          console.error(err)
        }
      } else {
        router.push('/')
      }
    }

    fetchBlogs()
  }, [router])

  return (
    <div className='max-w-5xl mx-auto p-8 md:p-16'>
      <h1 className='text-3xl font-medium'>Manage Blogs</h1>
      <div className='flex justify-end'>
        <Link href='/admin/blogs/create' className='
          p-2 shadow-xl font-medium text-stone-800 hover:text-stone-800 bg-white hover:bg-stone-100
        '>Create</Link>
      </div>
      <div className='mt-8'>
        <Table data={blogs} />
      </div>
    </div>
  )
}

export default AdminBlogsIndexPage