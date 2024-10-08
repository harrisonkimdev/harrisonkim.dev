'use client'

import { IBlog } from '@/interfaces'

import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import Link from 'next/link'
import Table from 'app/admin/blog/_components/Table'

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
            headers: {
              'Content-Type': 'application/json',
            }
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
  }, [router])

  return (
    <div className='max-w-5xl mx-auto p-8 md:p-16'>
      <h1 className='text-3xl font-medium'>Manage blog</h1>
      <div className='flex justify-end'>
        <Link href='/admin/blog/create' className='
          p-2 shadow-xl font-medium text-stone-800 hover:text-stone-800 bg-white hover:bg-stone-100
        '>Create</Link>
      </div>
      <div className='mt-8'>
        <Table data={blog} />
      </div>
    </div>
  )
}

export default AdminBlogIndexPage