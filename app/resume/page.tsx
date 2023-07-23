import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Page = () => {
  return (
    <>
      <div className='lg:py-8 max-w-5xl justify-center mx-auto'>
        <div className='pb-10 flex flex-col bg-stone-50'>
          {/* header */}
          <div className='bg-blue-400'>
            <div className='
              flex flex-col gap-10 justify-between items-center px-8 py-4 text-white
              md:flex-row md:gap-0
            '>
              {/* name, title, address */}
              <div className='text-center md:text-start'>
                <h3 className='text-3xl font-bold'>Harrison Kim</h3>
                <p className='font-normal'>Software Engineer</p>
                <p className='mt-3 font-light'>London, ON (Willing to relocate)</p>
              </div>
              {/* contact */}
              <div className='text-center md:text-end whitespace-nowrap flex flex-col gap-2'>
                <p>📱 (204) 588-7754</p>
                <p>📧 hsookim90@gmail.com</p>
                <div className='flex gap-3'>
                  {/* LinkedIn */}
                  <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/' target="_blank" className='flex gap-2'>
                    <Image src='/images/logos/linkedin-logo.png' alt='GitHub Logo' width={512} height={512} className='object-contain w-5 h-5'/>
                    <p className='text-white hover:text-white hover:underline'>LinkedIn</p>
                  </Link>
                  {/* GitHub */}
                  <Link href='https://github.com/hhkimmm9' target="_blank" className='flex gap-2'>
                    <Image src='/images/logos/github-logo.png' alt='GitHub Logo' width={512} height={512} className='object-contain w-5 h-5'/>
                    <p className='text-white hover:text-white hover:underline'>GitHub</p>
                  </Link>
                  {/* Personal */}
                  <Link href='https://www.harrisonkim.dev/' className='flex gap-2'>
                    <span>🧑🏻‍💻</span>
                    <p className='text-white hover:text-white hover:underline'>Personal Website</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* body */}
          <div className='flex flex-col gap-4 px-8 py-2'>
            {/* skills */}
            <div>
              <h3 className='text-2xl font-bold'>Skills</h3>
              <hr className='border-b border-stone-300 mb-2 w-full' />
              <div className='grid grid-cols-1 md:grid-cols-3 md:gap-12'>
                {/* 1st column */}
                <div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Next.js (React.js)</p>
                    <p>●●●●○</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Laravel & Vue.js</p>
                    <p>●●●●○</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Python</p>
                    <p>●●●○○</p>
                  </div>
                </div>
                {/* 2nd column */}
                <div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Typescript</p>
                    <p>●●●○○</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>MySQL & MongoDB</p>
                    <p>●●●●○</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Git</p>
                    <p>●●●●○</p>
                  </div>
                </div>
                {/* 3rd column */}
                <div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>AWS</p>
                    <p>●●●○○</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Figma</p>
                    <p>●●●●●</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Jira</p>
                    <p>●●●●○</p>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* work experiences */}
            <div>
              <h3 className='text-2xl font-bold'>Work Experiences</h3>
              <hr className='border-b border-stone-300 mb-2 w-full' />
              <div className='flex flex-col gap-4'>
                {/* dandycv */}
                <div>
                  <div className='flex flex-col md:flex-row md:items-center justify-between'>
                    <h4 className='text-lg font-semibold'>dandycv - Freelanc Web Development (Next.js)</h4>
                    <p className='text-sm text-stone-500'>Jun 2023 - Current</p>
                  </div>
                  <ul className='list-disc ml-6'>
                    <li>Implemented secure authentication by utilizing NextAuth.</li>
                    <li>Enabled flexible payment options for subscriptions through Stripe.</li>
                    <li>Implemented multi-language support using i18next for seamless localization and translation capabilities.</li>
                    <li>Developed an email notification system with Resend.</li>
                  </ul>
                </div>
                {/* modzee software */}
                <div>
                  <div className='flex flex-col md:flex-row md:items-center justify-between'>
                    <h4 className='text-lg font-semibold'>modzee Software - Full Stack Engineer (Laravel & Vue.js)</h4>
                    <p className='text-sm text-stone-500'>Dec 2022 - Jan 2023</p>
                  </div>
                  <p className='mt-2 md:mt-0'>
                    Responsible for the development of the company app and services. As
                    one of the initial members of the company, the projects I worked on are:
                  </p>
                </div>

                {/* modzee shop */}
                <div>
                  <h4 className='text-lg font-semibold'>modzee Shop (a multi-vendor marketplace)</h4>
                  <ul className='list-disc ml-6'>
                    <li>Architected and developed an e-commerce platform with comprehensive functionality for orders, shipping, inventory, and store pages.</li>
                    <li>Integrated Stripe payment system to ensure seamless and secure transaction.</li>
                  </ul>
                </div>

                {/* modzee notes */}
                <div>
                  <h4 className='text-lg font-semibold'>modzee Notes (All-in-one Notes)</h4>
                  <ul className='list-disc ml-6'>
                    <li>Utilized Pusher for real-time collaborative editing to foster seamless collaboration and enhancing productivity.</li>
                    <li>Developed responsive layout adaptable to diverse screen sizes.</li>
                    <li>Enhanced search accuracy by 30% through the implementation of tag-based search functionality.</li>
                  </ul>
                </div>

                {/* global/site-wise search functionality */}
                <div>
                  <h4 className='text-lg font-semibold'>Global/site-wise search functionality</h4>
                  <ul className='list-disc ml-6'>
                    <li>Achieved a 60% improvement in search result accuracy through the implementation of sorting, filtering, and pagination features.</li>
                    <li>Optimized SQL DB queries to elevate search performance</li>
                  </ul>
                </div>

                {/* localization */}
                <div>
                  <h4 className='text-lg font-semibold'>Localization</h4>
                  <ul className='list-disc ml-6'>
                    <li>Utilized i18next to support multi-language functionality.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* recent projects */}
            <div className='flex justify-between items-start gap-10'>
              <div className='w-full'>
                <h3 className='text-2xl font-bold'>Recent Projects</h3>
                <hr className='border-b border-stone-300 mb-2 w-full' />
                <div>
                  <div className='flex flex-col md:flex-row md:items-center justify-between'>
                    <h4 className='text-lg font-semibold'>mosPic (Next.js)</h4>
                    <p className='text-sm text-stone-500'>May 2023 - Current</p>
                  </div>
                  <ul className='list-disc ml-6'>
                    <li>Developing AI-powered <Link href='https://github.com/facebookresearch/segment-anything' target="_blank" className='underline'>(Segment-Anything)</Link> image editing tool, revolutionizing image manipulation capabilities.</li>
                    <li>Designed and built canvas, editor, and gallery pages with meticulous design and implementation.</li>
                    <li>Managing a team of five individuals as a project manager.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* education */}
            <div className='flex justify-between items-start gap-10'>
              <div className='w-full'>
                <h3 className='text-2xl font-bold'>Education</h3>
                <hr className='border-b border-stone-300 mb-2 w-full' />
                <div>
                  <h4 className='text-lg font-semibold'>B.Sc Computer Science, University of Manitoba</h4>
                  <p className='text-stone-500 text-sm'>May 2020</p>
                </div>
              </div>
              <div>
                <Image src='/images/logos/uofm-logo.jpeg' alt='' width={80} height={80} className='object-contain'></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page