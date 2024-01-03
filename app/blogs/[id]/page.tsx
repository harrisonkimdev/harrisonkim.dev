import React from 'react'

// component
import ControlSection from './ControlSection'

const getBlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/blogs/${id}?readOnly=1`)
    const blog = await res.json()
    return blog
  } catch (err) {
    // 
  }
}

const BlogShow = async ({ params }: { params: { id: string } }) => {
  const blog = await getBlog(params.id)

  return (
    <>
      <div className='mt-4'>
        <h1 className='text-xl md:text-3xl font-bold text-stone-800'>{ blog.title }</h1>
        <ControlSection blog={blog} />
        
        <hr className='border-b border-stone-400' />
        <div dangerouslySetInnerHTML={{ __html: blog.content }}
          className='my-2 md:my-3 text-stone-600'
        />
      </div>
    </>
  )
}

export default BlogShow