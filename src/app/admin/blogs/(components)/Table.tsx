'use client'

import { IBlog } from '@/interfaces'
import { useEffect, useState } from 'react'
import { convertDate } from '@/lib/functions'
import Link from 'next/link'
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6'

const TableComponent = ({ data }: { data: IBlog[] }) => {
  const [blog, setBlog] = useState<IBlog[]>([])

  useEffect(() => {
    setBlog(data)
  }, [data])

  const deleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (res.ok) {
        fetchBlogData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchBlogData = async () => {
    try {
      const res = await fetch(`/api/blog`, {
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
  }

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="w-3/12 border border-gray-300 px-4 py-2 text-left">Title</th>
          <th className="w-5/12 border border-gray-300 px-4 py-2 text-left">Content</th>
          <th className="w-3/12 border border-gray-300 px-4 py-2 text-left">Updated At</th>
          <th className="w-1/12 border border-gray-300 px-4 py-2 text-center">Update/Delete</th>
        </tr>
      </thead>

      <tbody>
        {blog?.map((blog: IBlog) => (
          <tr key={blog._id} className="hover:bg-gray-50">
            {/* Title */}
            <td className="border border-gray-300 px-4 py-2">
              <Link href={`/blog/${blog._id}`}
                className="text-stone-800 hover:text-stone-400 hover:underline"
              >{blog.title}</Link>
            </td>
            
            {/* Content */}
            <td className="border border-gray-300 px-4 py-2">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} className="h-12 overflow-hidden line-clamp-2" />
            </td>
            
            {/* Updated at */}
            <td className="border border-gray-300 px-4 py-2">
              <span className="whitespace-nowrap">{convertDate(blog.updatedAt)}</span>
            </td>
            
            {/* Update/Delete */}
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex gap-3 justify-center">
                <Link href={`/admin/blogs/${blog._id}/edit`}
                  className="text-xl text-stone-800 hover:text-stone-800"
                ><FaPenToSquare /></Link>
                <button onClick={() => { deleteBlog(blog._id) }}
                  className="text-xl text-stone-800 hover:text-stone-800"
                ><FaRegTrashCan /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={4} className="border border-gray-300 px-4 py-2">
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 border rounded">&lt;</button>
              <button className="px-3 py-1 border rounded">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <button className="px-3 py-1 border rounded">4</button>
              <button className="px-3 py-1 border rounded">&gt;</button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default TableComponent