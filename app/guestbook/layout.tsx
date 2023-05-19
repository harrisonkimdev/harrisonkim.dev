import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='max-w-5xl mx-auto py-20 flex flex-col'>
        {/* heading */}
        <div className='mb-4'>
          <h1 className='text-4xl font-semibold text-stone-800'>Guestbook</h1>
          <hr className='border-1 border-stone-800'/>
        </div>

        <div>{ children }</div>
      </div>
    </>
  )
}

export default layout