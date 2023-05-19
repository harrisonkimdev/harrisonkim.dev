// index

'use client'

import React, { useState, useEffect } from 'react'
import './styles/table.css'
import Link from 'next/link'
import axios from 'axios'

const page = () => {
  const [guestbooks, setGuestbooks] = useState([])

  useEffect(() => {
    const fetchGuestbooks = async () => {
      await axios
        .get('/api/guestbooks')
        .then((res) => {
          setGuestbooks(res.data)
        })
        
    }

    fetchGuestbooks()
  }, [])

  return (
    <section className='flex flex-col gap-4'>
      {/* table */}
      <table id='customers' className='w-full border'>
        <thead>
          <tr className=''>
            <th>ID</th>
            <th>Title</th>
            <th>Writer</th>
            <th>View Count</th>
            <th>Create at</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: custom type (ts) */}
          { guestbooks.map(guestbook => {
            return (
              <tr>
                <td>{ guestbook._id }</td>
                <td><Link href={`guestbook/${guestbook._id}`} className='hover:underline'>{ guestbook.title }</Link></td>
                <td>{ guestbook.writer }</td>
                <td>{ guestbook.viewCount }</td>
                <td className='w-min'>{ guestbook.createdAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className='flex justify-end'>
        <Link href='/guestbook/create'
          className='bg-zinc-400 text-white font-normal px-2 py-1 rounded-lg'
        > Write</Link>
      </div>

      {/* pagination */}
      <div className='flex justify-center'>
        <p>pagination placeholder</p>
      </div>
    </section>
  )
}

export default page