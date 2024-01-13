"use client"

import React, { useEffect, useState } from 'react'
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

const TableComponent = () => {
  const [blog, setBlog] = useState<IBlog[]>([])

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch('/api/blog')
        const data = await res.json()
        setBlog(data.blog)
      } catch (err) {
        console.error(err)
      }
    }
  
    fetchBlogData()
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

  return (
    <Table celled>
      <TableHeader>
        <TableRow>
          <TableHeaderCell width={4}>Title</TableHeaderCell>
          <TableHeaderCell width={5}>Content</TableHeaderCell>
          <TableHeaderCell width={1}>Updated At</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        { blog?.map((blog: IBlog) => {
          return (
            <TableRow key={blog._id} className='hover:bg-stone-100'>
              <TableCell>
                <Link href={`/blog/${blog._id}`}
                  className='text-stone-800 hover:text-stone-400 hover:underline'
                >{ blog.title }</Link>
              </TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} className='h-[3rem] overflow-hidden line-clamp-2' />
              </TableCell>
              <TableCell><span className='whitespace-nowrap'>{ convertDate(blog.updatedAt) }</span></TableCell>
            </TableRow>
          )
        }) }
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableHeaderCell colSpan='3'>
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