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

  return (
    <>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Content</TableHeaderCell>
            <TableHeaderCell>Tags</TableHeaderCell>
            <TableHeaderCell>Updated At</TableHeaderCell>
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
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} className='' />
                </TableCell>
                <TableCell>{ blog.tags.map((tag: string) => <>{ tag }</>) }</TableCell>
                <TableCell>{ blog.updatedAt.toString() }</TableCell>
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
    </>
  )
}

export default TableComponent