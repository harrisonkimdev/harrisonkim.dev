import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ThirdRow = () => {
  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 1.0 // 100% of the element must be visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {        
        if (entry.isIntersecting) {
          if (entry.target.className.includes('thirdRowCard1')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__backInLeft')
          }
          else if (entry.target.className.includes('thirdRowCard2')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__backInLeft')
          }
          else if (entry.target.className.includes('thirdRowCard3')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__backInLeft')
          }
          else if (entry.target.className.includes('thirdRowCard4')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__backInLeft')
          }
        }
      })
    }, observerOptions)

    activateObservers(observer)
  
    return () => {
      inactivateObservers(observer)
    }
  }, [])
  
  const thirdRowCard1 = useRef(null)
  const thirdRowCard2 = useRef(null)
  const thirdRowCard3 = useRef(null)
  const thirdRowCard4 = useRef(null)

  const activateObservers = (observer) => {
    if (thirdRowCard1.current) {
      observer.observe(thirdRowCard1.current)
    }
    if (thirdRowCard2.current) {
      observer.observe(thirdRowCard2.current)
    }
    if (thirdRowCard3.current) {
      observer.observe(thirdRowCard3.current)
    }
    if (thirdRowCard4.current) {
      observer.observe(thirdRowCard4.current)
    }
  }

  const inactivateObservers = (observer) => {
    if (thirdRowCard1.current) {
      observer.unobserve(thirdRowCard1.current)
    }
    if (thirdRowCard2.current) {
      observer.unobserve(thirdRowCard2.current)
    }
    if (thirdRowCard3.current) {
      observer.unobserve(thirdRowCard3.current)
    }
    if (thirdRowCard4.current) {
      observer.unobserve(thirdRowCard4.current)
    }
  }

  return (
    <div className='
      w-full min-h-screen h-full px-8 pt-10 pb-16 md:py-20 bg-stone-300
    '>
      <div className='max-w-5xl mx-auto'>
        
        {/* title */}
        <h2 className='text-5xl font-bold text-stone-800'>
          <Link href='/projects'
            className='text-stone-500 hover:text-stone-600 hover:underline'
          >Projects</Link>
          <span> I&apos;ve been working on</span>
        </h2>

        {/* cards */}
        <ul className='mt-6 flex flex-col gap-4'>
          {/* dandycv */}
          <Link href='https://dandycv.vercel.app' target='_blank'
            ref={thirdRowCard1} className='animate__animated thirdRowCard1 opacity-0'
          >
            <li className='p-6 rounded-xl bg-stone-50 hover:bg-stone-100'>
              <div className='flex flex-col md:grid md:grid-cols-4 gap-8'>
                <div className='md:col-span-3'>
                  <h3 className='text-3xl font-bold text-stone-800'>dandycv</h3>
                  <h4 className='text-xl font-medium mt-2 text-stone-600'>Promotional website for a startup</h4>
                  <ul className='list-disc pl-6 text-stone-800'>
                    <li>Optimized the DB system by meticulously designing data model relationships, leading to a remarkable 50% reduction in access frequency.</li>
                    <li>Effectively managed large volumes of user data within the admin page by incorporating features like search, sorting, and filtering, achieving a 70% reduction in loading time through lazy loading with pagination.</li>
                    <li>Implemented a payment system using Stripe and integrated data sharing with a desktop application through APIs.</li>
                  </ul>
                </div>

                <Image
                  src='/images/screenshots/dandycv/landing_page.png'
                  alt='dandycv preview'
                  width={1595}
                  height={964}
                  className='object-contain h-full w-full md:col-span-1'
                />
              </div>
            </li>
          </Link>

          {/* mosPic */}
          <Link href='/projects#mospic'
            ref={thirdRowCard2} className='animate__animated thirdRowCard2 opacity-0'
          >
            <li className='p-6 rounded-xl bg-stone-50 hover:bg-stone-100'>
              <div className='flex flex-col md:grid md:grid-cols-4 gap-8'>
                <div className='md:col-span-3'>
                  <h3 className='text-3xl font-bold text-stone-800'>
                    mos<span className='text-stone-500'>Pic</span>
                  </h3>
                  <h4 className='text-xl font-medium mt-2 text-stone-600'>
                    Image editing tool with the help of AI -
                    <Link
                      href='https://segment-anything.com/'
                      target='_blank'
                      className='text-stone-800
                    '> Segment Anything </Link>
                  </h4>
                  <ul className='list-disc pl-6 text-stone-800'>
                    <li>Distributed tasks effectively to each team member and ran a 2 week-sprint using Agile as a project manager.</li>
                    <li>Utilized Google CoLab to generate an ONNX model, enabling the image segmentation AI to analyze given images.</li>
                    <li>Engaged with the open-source community to acquire backend code running SAM (Segment Anything), enabling the generation of image embedding files and facilitating focus on web development tasks.</li>
                  </ul>
                </div>

                <Image
                  src='/images/screenshots/mosPic/gallery-page.png'
                  alt='mosPic preview'
                  width={1562}
                  height={1036}
                  className='object-contain h-full w-full md:col-span-1'
                />
              </div>
            </li>
          </Link>

          {/* Dashboard */}
          <Link href='/projects#dashboard'
            ref={thirdRowCard3} className='animate__animated thirdRowCard3 opacity-0'
          >
            <li className='p-6 rounded-xl bg-stone-50 hover:bg-stone-100'>
                <div className='flex flex-col md:grid md:grid-cols-4 gap-8'>
                  <div className='md:col-span-3'>
                    <h3 className='text-3xl font-bold text-stone-800'>Dashboard</h3>
                    <h4 className='text-xl font-medium mt-2 text-stone-600'>An all-in-one office tool designed specifically for programmers.</h4>
                    <ul className='list-disc pl-6 text-stone-800'>
                      <li>Configured AWS VPC and EC2 instances with Nginx, and managed DNS for web hosting with personal domain.</li>
                      <li>Enhanced performance by 40% with Inertia.js, bolstering SSR for faster loading and improved user experiences.</li>
                      <li>Utilized GitHub Issues to manage tasks, getting myself familarized with Agile as a project manager&apos;s perspective.</li>
                      <li>Reached out to the author of a book I was inspired by to seek permission to incorporate their methodology into my project.</li>
                    </ul>
                  </div>

                  <Image
                    src='/images/screenshots/Dashboard/notes.png'
                    alt='Dashboard preview'
                    width={1525}
                    height={1043}
                    className='object-contain h-full w-full md:col-span-1'
                  />
                </div>
            </li>
          </Link>

          {/* Claw Machine */}
          <Link href='/projects#threejs'
            ref={thirdRowCard4} className='animate__animated thirdRowCard4 opacity-0'
          >
            <li className='p-6 rounded-xl bg-stone-50 hover:bg-stone-100'>
              <div className='flex flex-col md:grid md:grid-cols-4 gap-8'>
                <div className='md:col-span-3'>
                  <h3 className='text-3xl font-bold text-stone-800'>Claw machine</h3>
                  <h4 className='text-xl font-medium mt-2 text-stone-600'>Experience an immersive and interactive virtual claw machine powered by the advanced 3D modeling library, three.js.</h4>
                  <ul className='list-disc pl-6 text-stone-800'>
                    <li>Utilized osm2world to create 3D models from OSM data, significantly reducing development time.</li>
                    <li>Implemented physics in the map with interactions with user input.</li>
                  </ul>
                </div>

                <Image
                  src='/images/screenshots/claw-machine/full.png'
                  alt='Claw Machine preview'
                  width={128}
                  height={128}
                  className='object-contain h-full w-full md:col-span-1'
                />
              </div>
            </li>
          </Link>
        </ul>

      </div>
    </div>
  )
}

export default ThirdRow