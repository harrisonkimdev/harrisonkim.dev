import React from 'react'
import Image from 'next/image'

const Page = () => {
  return (
    <section>
      {/* Layout for Tablets & Desktops */}
      <div className='
        hidden items-center
        md:flex md:flex-col
      '>
        {/* first */}
        <div className='bg-stone-100 w-full justify-center flex'>

          <div className='flex gap-10 items-center my-20'>
            <Image src="/images/profile/me.png" alt="" width={288} height={288}
              className='
                object-contain
                md:w-60
                lg:w-72
              '
            />
            <div className=''>
              <p className='
                font-bold text-stone-500
                md:text-6xl
                lg:text-7xl 
              '>
                Hi, <br />
                <span className='whitespace-nowrap'>I&apos;m <span className='text-stone-700'>Harrison</span>,</span> <br />
                Full Stack <br /> Engineer
              </p>
            </div>
          </div>
        </div>

        {/* second */}
        <div className='w-full bg-white md:px-10 lg:px-16 pt-10 pb-20'>
          <div className='max-w-5xl mx-auto'>

            <p className='text-5xl font-bold text-stone-800'>Here are my
              <span className='text-stone-500'> skill sets</span>
            </p>

            <div className='grid grid-cols-3 md:gap-6 lg:gap-8 mt-6'>
              <div className='px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md relative hover:bg-stone-50'>
                <h4 className='text-2xl font-medium text-stone-800'>Web Development</h4>
                <ul className='mt-2 mb-24'>
                  <li><p className='text-lg text-stone-800'>Laravel & Vue.js</p></li>
                  <li><p className='text-lg text-stone-800'>Next.js</p></li>
                  <li><p className='text-lg text-stone-800'>AWS & ngnix</p></li>
                </ul>
                <div className='flex justify-center absolute left-0 right-0 bottom-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 h-20 text-stone-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
              </div>
              <div className='px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md relative hover:bg-stone-50'>
                <h4 className='text-2xl font-medium text-stone-800'>Programming Tools</h4>
                <ul className='mt-2 mb-24'>
                  <li><p className='text-lg text-stone-800'>Git</p></li>
                  <li><p className='text-lg text-stone-800'>SQL</p></li>
                  <li><p className='text-lg text-stone-800'>Figma</p></li>
                </ul>
                <div className='flex justify-center absolute left-0 right-0 bottom-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 h-20 text-stone-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>

                </div>
              </div>
              <div className='px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md relative hover:bg-stone-50'>
                <h4 className='text-2xl font-medium text-stone-800'>Others</h4>
                <ul className='mt-2 mb-24'>
                  <li><p className='text-lg text-stone-800'>Java (OOP)</p></li>
                  <li><p className='text-lg text-stone-800'>Python & C</p></li>
                </ul>
                <div className='flex justify-center absolute left-0 right-0 bottom-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 h-20 text-stone-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full bg-stone-300 h-72'>
        <div className='max-w-5xl mx-auto'>

        </div>
      </div>

      {/* Layout for smartphones */}
      <div className='flex md:hidden flex-col items-center gap-10 p-6'>
        <div className='flex flex-col items-center'>
          <Image src="/images/profile/me.png" alt="" width={240} height={240} />
          <p className='text-5xl font-bold text-stone-500 dark:text-stone-300'>
            Hi,
            <br />
            <span className='whitespace-nowrap'>I&apos;m <span className='text-stone-700'>Harrison</span>,</span>
            <br />
            Full-stack
            <br />
            Engineer
          </p>
        </div>

        {/* <div className='grid grid-rows-3 gap-4 w-full'>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>ABCD</p>
          </div>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>가나다라</p>
          </div>
          <div className='bg-white hover:bg-stone-50 dark:bg-stone-400 dark:hover:bg-stone-300 px-4 py-12 rounded-lg text-center text-2xl'>
            <p className='hover:text-4xl ease-in duration-100'>1234</p>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Page