"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Label,
  Menu,
  Table,
} from 'semantic-ui-react'

import { IBlog, IComment } from '@/interfaces';
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

const TableComponent = ({ data }: { data: IBlog[] }) => {
  const { data: session, status } = useSession({ required: true })

  const [blog, setBlog] = useState<IBlog[]>([])

  useEffect(() => {
    setBlog(data)
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

  const deleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
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
                  <Link href={`/admin/blog/${blog._id}/edit`}
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