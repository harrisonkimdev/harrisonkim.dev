import React from 'react'
import BlogSidebar from './components/BlogSidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full py-10 bg-stone-50'>
            <div className='max-w-5xl mx-auto px-8 grid grid-cols-5'>
                {/* heading */}
                <div className='
                    col-span-1 rounded-lg border-2 border-stone-500 bg-stone-100
                '>
                    <BlogSidebar />
                </div>
                
                <main className='col-span-4 h-full'>{ children }</main>
            </div>
        </div>
    )
}

export default Layout