import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <main className="min-h-screen">
      {/* Layout for Tablets & Desktops */}
      <div className='hidden md:flex flex-col items-center gap-20 p-24'>
        <div className='flex gap-10 items-center'>
          <Image src="/images/profile/me.png" alt="" width={320} height={320} />
          <div className=''>
            <p className='text-7xl font-bold text-stone-500 dark:text-stone-300'>
              Hi,
              <br />
              <span className='whitespace-nowrap'>I'm <span className='text-stone-700 dark:text-stone-500'>Harrison</span>,</span>
              <br />
              Full-stack
              <br />
              Engineer
            </p>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-8 w-full'>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>ABCD</p>
          </div>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>가나다라</p>
          </div>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>1234</p>
          </div>
        </div>
      </div>

      {/* Layout for smartphones */}
      <div className='flex md:hidden flex-col items-center gap-10 p-6'>
        <div className='flex flex-col items-center'>
          <Image src="/images/profile/me.png" alt="" width={240} height={240} />
          <p className='text-5xl font-bold text-stone-500 dark:text-stone-300'>
            Hi,
            <br />
            <span className='whitespace-nowrap'>I'm <span className='text-stone-700 dark:text-stone-500'>Harrison</span>,</span>
            <br />
            Full-stack
            <br />
            Engineer
          </p>
        </div>

        <div className='grid grid-rows-3 gap-4 w-full'>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>ABCD</p>
          </div>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>가나다라</p>
          </div>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>1234</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page