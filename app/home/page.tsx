import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='rounded-2xl p-10 bg-white'>
        <img src="https://pbs.twimg.com/profile_images/995894346657554432/doixd_kQ_400x400.jpg" alt="" />

        <div className='text-center'>
          <p className='my-10'>Migrating from</p> 

          <div className='flex justify-center gap-2'>
            <Image src="/images/logos/laravel-logo.png" alt="Laravel Logo" width={60} height={100} priority></Image>
            <Image src="/images/logos/vue-logo.png" alt="Vue.js Logo" width={100} height={100} priority></Image>
          </div>

          <p className='my-10'>to</p>

          <div className='flex justify-center'>

            <Image src="/images/logos/nextjs-logo.png" alt="Next.js Logo" width={100} height={100} priority></Image>
          </div>

        </div>
      </div>

    </main>
  )
}

export default page