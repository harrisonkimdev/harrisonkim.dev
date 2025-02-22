'use client'

import { IBlog, IComment } from '@/interfaces'
import { useEffect, useState } from 'react'
import { convertDate } from '@/utils/functions'
import {
  Table, TableHeader, TableHeaderCell,
  TableBody, TableRow, TableCell, TableFooter,
  Menu, MenuItem, Icon, Label,
} from 'semantic-ui-react'

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
    <Table celled>
      <TableHeader>
        <TableRow>
          <TableHeaderCell width={3}>Title</TableHeaderCell>
          <TableHeaderCell width={5}>Content</TableHeaderCell>
          <TableHeaderCell width={3}>Updated At</TableHeaderCell>
          <TableHeaderCell width={1}>Update/Delete</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        { blog?.map((blog: IBlog) => {
          return (
            <TableRow key={blog._id} className='hover:bg-stone-100'>
              {/* Title */}
              <TableCell>
                <Link href={`/blog/${blog._id}`}
                  className='text-stone-800 hover:text-stone-400 hover:underline'
                >{ blog.title }</Link>
              </TableCell>
              
              {/* Content */}
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} className='h-[3rem] overflow-hidden line-clamp-2' />
              </TableCell>
              
              {/* Updated at */}
              <TableCell>
                <span className='whitespace-nowrap'>{ convertDate(blog.updatedAt) }</span>
              </TableCell>
              
              {/* Update/Delete */}
              <TableCell>
                <div className='flex gap-3 justify-center'>
                  <Link href={`/admin/blogs/${blog._id}/edit`}
                    className='text-xl text-stone-800 hover:text-stone-800'
                  ><FaPenToSquare /></Link>
                  <button onClick={() => { deleteBlog(blog._id) }}
                    className='text-xl text-stone-800 hover:text-stone-800'
                  ><FaRegTrashCan /></button>
                </div>
              </TableCell>
            </TableRow>
          )
        }) }
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableHeaderCell colSpan='4'>
            <Menu floated='right' pagination>
              <MenuItem as='a' icon>
                <Icon name='chevron left' />
              </MenuItem>
              <MenuItem as='a'>1</MenuItem>
              <MenuItem as='a'>2</MenuItem>
              <MenuItem as='a'>3</MenuItem>
              <MenuItem as='a'>4</MenuItem>
              <MenuItem as='a' icon>
                <Icon name='chevron right' />
              </MenuItem>
            </Menu>
          </TableHeaderCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default TableComponent