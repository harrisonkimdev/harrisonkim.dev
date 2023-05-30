import React from 'react'
import Image from 'next/image'

const Page = () => {
  return (
    <section className='w-full bg-stone-50'>
      <div className='max-w-5xl mx-auto h-full flex flex-col justify-center'>
        <div className='flex flex-col text-center items-center'>
          <Image src='/images/logos/dev-kim-transparent.png' alt='Site Logo' width={686} height={172} className='object-contain w-1/3' />

          <div>
            <h1 className='mt-8 text-4xl'>개발자 김해수</h1>
            <h4 className='mt-2 text-base'>Dev. Harrison Kim</h4>
            <p className='text-sm'>2023</p>
          </div>

          <div className='mt-16 flex flex-col gap-4 items-center'>
            <p className='text-2xl'>Built with</p>
            <div className='flex flex-col items-center gap-6 mt-2'>
              <Image src='/images/logos/nextjs-logo.png' alt='Next.js Logo' width={640} height={130} className='object-contain w-1/6'/>
              <Image src='/images/logos/mongodb-logo.png' alt='MongoDB Logo' width={1280} height={345} className='object-contain w-1/5'/>
            </div>
            
            <p className='text-2xl mt-16'>Powered by</p>
            <Image src='/images/logos/vercel-logo.png' alt='Vercel Logo' width={2560} height={586} className='object-contain w-1/6 mt-2'/>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Page