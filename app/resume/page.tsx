import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
  return (
    <section className='flex flex-col my-14 pb-14 max-w-5xl justify-center mx-auto border shadow-lg bg-white'>
      {/* header */}
      <div className='bg-sky-900'>
        <div className='flex justify-between items-center px-8 py-4 text-white'>
          <div>
            <h3 className='text-3xl font-bold'>Harrison Kim</h3>
            <p className='font-light'>Full Stack Engineer</p>
            <p className='mt-3 font-light'>London, ON (Willing to relocate)</p>
          </div>
          <div className='text-end whitespace-nowrap flex flex-col gap-2'>
            <p>📱 (204) 588-7754</p>
            <p>📧 hsookim90@gmail.com</p>
            <div className='flex gap-2'>
              <p>🧑🏻‍💻</p>
              <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/'><p>LinkedIn</p></Link>
              <Link href='https://github.com/hhkimmm9'><p>GitHub</p></Link>
              <Link href='https://www.harrisonkim.dev/'><p>Personal Website</p></Link>
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className='flex flex-col gap-4 px-8'>
        {/* introduction */}
        <div className='my-1 relative'>
          <p>
            I am a highly motivated software engineer with comprehensive experience in the entire software
            development life cycle. From gathering user requirements and architectural planning to coding, testing,
            and deployment, I have a proven track record of delivering high-quality solutions. I am eager to leverage
            my strong problem-solving and analytical skills, enabling me to write concise and logical code. With a
            dedicated and collaborative attitude, I thrive in team-based environments and contribute to a solid
            foundation of success.
          </p>
          <div className='absolute -top-3 left-0 right-0 text-center text-9xl opacity-10 font-bold'>
            PROFILE
          </div>
        </div>

        {/* work experiences */}
        <div>
          <h3 className='text-2xl font-bold'>Work Experiences</h3>
          <hr className='border-b border-zinc-300 mb-2 w-full' />
          <div className='flex flex-col gap-4'>
            {/* modzee software */}
            <div>
              <div className='flex justify-between items-center'>
                <h4 className='text-lg font-semibold'>modzee Software - Full Stack Engineer</h4>
                <p className='text-sm text-zinc-500'>Dec 2022 - Jan 2023</p>
              </div>
              <p>
                Responsible for the development of the company app and services, primarily using Laravel & Vue.js. As
                one of the initial members of the company, the projects I worked on are:
              </p>
            </div>

            {/* modzee shop */}
            <div>
              <h4 className='text-lg font-semibold'>modzee Shop (a multi-vendor marketplace)</h4>
              <ul className='list-disc ml-6'>
                <li>
                  Played a key role in the creation and implementation of essential pages such as Orders, Products,
                  Stocks, Shipment, and Payment Management.
                </li>
                <li>
                  Efficiently delegated tasks among colleagues using excellent communication skills, resulting in
                  reduced work time.
                </li>
              </ul>
            </div>

            {/* modzee notes */}
            <div>
              <h4 className='text-lg font-semibold'>modzee Notes (All-in-one Notes)</h4>
              <ul className='list-disc ml-6'>
                <li>Implemented a dynamic layout to ensure optimal accessibility for users across various screen sizes.</li>
                <li>
                  Provided users with a range of file attachment options, including PDF files, audio recordings, and
                  images created with a built-in drawing tool to represent datasets, to enhance usability
                </li>
                <li>Utilized Pusher to provide real-time collaborative editing functionality.</li>
              </ul>
            </div>

            {/* global/site-wise search functionality */}
            <div>
              <h4 className='text-lg font-semibold'>Global/site-wise search functionality</h4>
              <ul className='list-disc ml-6'>
                <li>
                  By providing sorting, filtering, and pagination functionalities, the search result accuracy has been improved by 60%.
                </li>
                <li>Implemented optimized DB queries for enhanced performance.</li>
              </ul>
            </div>

            {/* localization */}
            <div>
              <h4 className='text-lg font-semibold'>Localization</h4>
              <ul className='list-disc ml-6'>
                <li>
                Replaced all text-based components throughout the system with a new tool to support various languages.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* skills */}
        <div>
          <div className='flex justify-between items-end'>
            <h3 className='text-2xl font-bold'>Skills</h3>
            <div className='flex gap-4 items-center'>
              <Image src='/images/logos/laravel-logo.png' alt='' width={30} height={30} className='object-contain'/>
              <Image src='/images/logos/vuejs-logo.png' alt='' width={80} height={30} className='object-contain'/>
              <Image src='/images/logos/inertiajs-logo.png' alt='' width={30} height={30} className='object-contain'/>
              <Image src='/images/logos/pinia-logo.svg' alt='' width={25} height={30} className='object-contain'/>
              <Image src='/images/logos/tailwind-logo.png' alt='' width={150} height={30} className='object-contain'/>
              <Image src='/images/logos/nextjs-logo.png' alt='' width={100} height={30} className='object-contain'/>
            </div>
          </div>
          <hr className='border-b border-zinc-300 mb-2 w-full' />
          <div className='grid grid-cols-3 gap-12'>
            <div>
              <div className='flex justify-between'>
                <p className='text-sm'>Laravel & Vue.js</p>
                <p>●●●●○</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm'>Next.js</p>
                <p>●●●○○</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm'>AWS</p>
                <p>●●●○○</p>
              </div>
            </div>
            <div>
              <div className='flex justify-between'>
                <p className='text-sm'>Git</p>
                <p>●●●●○</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm'>SQL</p>
                <p>●●●●○</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm'>Figma</p>
                <p>●●●●○</p>
              </div>
            </div>
            <div>
              <div className='flex justify-between'>
                <p className='text-sm'>Java (OOP)</p>
                <p>●●●●○</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm'>Python, C</p>
                <p>●●●○○</p>
              </div>
            </div>
          </div>
        </div>

        {/* education */}
        <div className='flex justify-between items-start gap-10'>
          <div className='w-full'>
            <h3 className='text-2xl font-bold'>Education</h3>
            <hr className='border-b border-zinc-300 mb-2 w-full' />
            <div>
              <h4 className='text-lg font-semibold'>B.Sc Computer Science, University of Manitoba</h4>
              <p className='text-zinc-500 text-sm'>May 2020</p>
            </div>
          </div>
          <div>
            <Image src='/images/logos/uofm-logo.jpeg' alt='' width={80} height={80} className='object-contain'></Image>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page