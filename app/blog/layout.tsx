import React from 'react'
import BlogSidebar from '@/blog/components/BlogSidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full min-h-screen py-20 bg-stone-50'>
      {/* <div className='max-w-5xl mx-auto px-8 md:grid grid-cols-5'>
        <div className='
          hidden md:block col-span-1
          h-80 p-4 overflow-y-auto rounded-lg
        '>
          <BlogSidebar />
        </div>
          
        <div className='md:col-span-4 px-10'>
          { children }
        </div>
      </div> */}
      <div className='max-w-5xl mx-auto px-8'>
        { children }
      </div>
    </div>
  )
}

export default Layout