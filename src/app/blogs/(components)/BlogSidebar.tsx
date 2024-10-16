'use client'

import { useEffect, useState } from 'react'

const BlogSidebar = () => {
  const [tags, setTags] = useState([''])

  useEffect(() => {
    fetchByTag()
  }, [])

  const fetchByTag = async (tagType?: string) => {
    // const res = await fetch(`/api/blog/${tagType}`)
    // const data = await res.json()

    setTags(['ML', 'AI', 'JavaScript', 'TypeScript', 'Python', 'React.js'])
  }
  
  return (
    <>
      <p>Search by tag</p>
      <div className='flex flex-wrap'>
        {/* { tags?.map((tag: string) => (
          <span onClick={() => fetchByTag(tag)} className='
            w-min m-1 px-2 py-1 border rounded-lg bg-stone-400 hover:bg-stone-500
            whitespace-nowrap font-light text-white
            cursor-pointer
          '>{ tag }</span>
        )) } */}
      </div>
    </>
  )
}

export default BlogSidebar