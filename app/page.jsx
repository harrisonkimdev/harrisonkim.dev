'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import 'animate.css'

import { FaDisplay, FaDatabase, FaToolbox } from "react-icons/fa6";

export default function Home() {

  const secondRowTitle = useRef(null)
  const secondRowCard1 = useRef(null)
  const secondRowCard2 = useRef(null)
  const secondRowCard3 = useRef(null)
  const thirdRowCard1 = useRef(null)
  const thirdRowCard2 = useRef(null)
  const thirdRowCard3 = useRef(null)
  const thirdRowCard4 = useRef(null)
  const fourthContent = useRef(null)

  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 1.0 // 100% of the element must be visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {        
        if (entry.isIntersecting) {
          if (entry.target.className.includes('secondRowTitle')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__fadeIn')
          }
          else if (entry.target.className.includes('secondRowCard1')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__backInLeft')
          }
          else if (entry.target.className.includes('secondRowCard2')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__backInLeft')
          }
          else if (entry.target.className.includes('secondRowCard3')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__backInLeft')
          }
          else if (entry.target.className.includes('thirdRowCard1')) {
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
          else if (entry.target.className.includes('fourthContent')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate__bounce')
          }
        }
        
        // if you want to add effect every time users scroll through
        else {
          if (entry.target.className.includes('secondRowTitle')) {
            entry.target.classList.add('opacity-0')
            entry.target.classList.remove('animate__fadeIn')
          }
          else if (entry.target.className.includes('fourthContent')) {
            entry.target.classList.add('opacity-0')
            entry.target.classList.remove('animate__bounce')
          }
        }
      })
    }, observerOptions)

    activateObservers(observer)
  
    return () => {
      inactivateObservers(observer)
    }
  }, [])

  const activateObservers = (observer) => {

    if (secondRowTitle.current) {
      observer.observe(secondRowTitle.current)
    }
    if (secondRowCard1.current) {
      observer.observe(secondRowCard1.current)
    }
    if (secondRowCard2.current) {
      observer.observe(secondRowCard2.current)
    }
    if (secondRowCard3.current) {
      observer.observe(secondRowCard3.current)
    }
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
    if (fourthContent.current) {
      observer.observe(fourthContent.current)
    }
  }

  const inactivateObservers = (observer) => {
    
    if (secondRowTitle.current) {
      observer.unobserve(secondRowTitle.current)
    }
    if (secondRowCard1.current) {
      observer.unobserve(secondRowCard1.current)
    }
    if (secondRowCard2.current) {
      observer.unobserve(secondRowCard2.current)
    }
    if (secondRowCard3.current) {
      observer.unobserve(secondRowCard3.current)
    }
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
    if (fourthContent.current) {
      observer.unobserve(fourthContent.current)
    }
  }

  const scrollToBottom = () => {
    console.log('first11')
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }
  
  return (
    <>
      {/* Layout for Tablets & Desktops */}
      <div className='flex flex-col w-full items-center'>

        {/* first row */}
        <div className='
          w-full min-h-screen px-8 py-10 md:py-20 bg-stone-100
          flex flex-col gap-8 md:gap-16 justify-center items-center
        '>
          {/* profile picture and greeting */}
          <div className='px-8 md:px-0 flex flex-col md:flex-row md:gap-10 items-center'>
            <Image
              src="/images/profile/me_cropped.jpeg"
              alt="Profile picture of myself"
              width={2448} height={2334}
              placeholder='blur'
              blurDataURL='/images/profile/me_cropped.jpeg'
              className='
                w-72
                h-72
                rounded-full
                object-cover
            '/>
            <h1 className='
              text-5xl md:text-7xl font-bold text-stone-500
              animate__animated animate__pulse animate__repeat-3
            '>
              Hi, <br />
              <span className='whitespace-nowrap'>I&apos;m
                <span className='text-stone-700'> Harrison</span>,
              </span> <br /> Full Stack <br /> Engineer
            </h1>
          </div>

          {/* buttons */}
          <div className='flex flex-col gap-12'>
            <div className='grid grid-cols-2 gap-4 md:gap-8'>
              <div className='
                p-3 rounded-lg border border-stone-600 shadow-md
                text-center cursor-pointer hover:bg-stone-50
              '>
                <Link href="/assets/Harrison_Kim_Resume.pdf" target="_blank">
                  <span className='font-medium text-stone-500'>Download Resumé</span>
                </Link>
              </div>
              <div className='
                p-3 rounded-lg border border-stone-600 shadow-md
                text-center cursor-pointer hover:bg-stone-50
              '>
                <Link href="/contact-me">
                  <span className='font-medium text-stone-500'>Contact me</span>
                </Link>
              </div>
            </div>

            {/* click to go to the bottom of the page to try the dinosaur game */}
            <button onClick={scrollToBottom}className='hover:scale-125 ease-in duration-150'>
              <div className='
                p-3 rounded-lg border border-stone-600 shadow-md
                text-center cursor-pointer hover:bg-stone-50
              '>
                Latest Project. Please Try Me!
              </div>
            </button>
          </div>
        </div>

        {/* second row */}
        <div className='
          w-full min-h-screen px-8 pt-10 pb-20 md:py-28
          flex flex-col justify-center bg-white
        '>
          <div className='
            max-w-5xl mx-auto
            md:flex md:flex-col md:justify-center md:items-center
          '>
            {/* title */}
            <h2 className='text-5xl font-bold text-stone-800'>Here are my
              <span ref={secondRowTitle}
                className='text-stone-500
                  animate__animated animate__slow secondRowTitle opacity-0
              '> skill sets</span>
            </h2>

            {/* cards */}
            <div className='grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-6 mt-6'>
              {/* frontend */}
              <div ref={secondRowCard1} className='
                animate__animated animate__slow secondRowCard1 opacity-0
                px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md hover:bg-stone-50
              '>
                <h4 className='text-center text-2xl font-medium text-stone-800'>Frontend</h4>
                <ul className='h-36 mt-2 text-center'>
                  <li><p className='text-lg text-stone-800'>Next.js (React.js)</p></li>
                  <li><p className='text-lg text-stone-800'>Vue.js</p></li>
                  <li><p className='text-lg text-stone-800'>Tailwind</p></li>
                  <li><p className='text-lg text-stone-800'>TypeScript</p></li>
                </ul>
                <div className='flex justify-center left-0 right-0 bottom-4'>
                  <FaDisplay className="text-7xl text-stone-500" />
                </div>
              </div>
              {/* backend */}
              <div ref={secondRowCard2} className='
                animate__animated md:animate__delay-1s animate__slow secondRowCard2 opacity-0
                px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md hover:bg-stone-50
              '>
                <h4 className='text-center text-2xl font-medium text-stone-800'>Backend</h4>
                <ul className='h-36 mt-2 text-center'>
                <li><p className='text-lg text-stone-800'>Laravel & Node.js</p></li>
                  <li><p className='text-lg text-stone-800'>SQL & NoSQL (MongoDB)</p></li>
                  <li><p className='text-lg text-stone-800'>AWS & nginx</p></li>
                </ul>
                <div className='flex justify-center left-0 right-0 bottom-4'>
                  <FaDatabase className="text-7xl text-stone-500" />
                </div>
              </div>
              {/* others */}
              <div ref={secondRowCard3} className='
                animate__animated md:animate__delay-2s animate__slow secondRowCard3 opacity-0
                px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md hover:bg-stone-50
              '>
                <h4 className='text-center text-2xl font-medium text-stone-800'>Others</h4>
                <ul className='h-36 mt-2 text-center'>
                  <li><p className='text-lg text-stone-800'>Git & Jira</p></li>
                  <li><p className='text-lg text-stone-800'>Figma</p></li>
                  <li><p className='text-lg text-stone-800'>Python & Java (OOP)</p></li>
                </ul>
                <div className='flex justify-center left-0 right-0 bottom-4'>
                  <FaToolbox className="text-7xl text-stone-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* third row */}
        <div className='w-full px-8 pt-10 pb-16 md:py-20 bg-stone-300'>
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
              <Link href='https://dandycv.vercel.app' target="_blank"
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

                    <Image src='/images/screenshots/dandycv/landing_page.png' alt='mosPic Image'
                      width={1595} height={964} className='object-contain h-full w-full md:col-span-1'
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
                      <h3 className='text-3xl font-bold text-stone-800'>mos<span className='text-stone-500'>Pic</span></h3>
                      <h4 className='text-xl font-medium mt-2 text-stone-600'>
                        Image editing tool with the help of AI -
                        <Link href='https://segment-anything.com/' target="_blank" className='text-stone-800'> Segment Anything</Link>
                      </h4>
                      <ul className='list-disc pl-6 text-stone-800'>
                        <li>Distributed tasks effectively to each team member and ran a 2 week-sprint using Agile as a project manager.</li>
                        <li>Utilized Google CoLab to generate an ONNX model, enabling the image segmentation AI to analyze given images.</li>
                        <li>Engaged with the open-source community to acquire backend code running SAM (Segment Anything), enabling the generation of image embedding files and facilitating focus on web development tasks.</li>
                      </ul>
                    </div>

                    <Image src='/images/screenshots/mosPic/gallery-page.png' alt='mosPic Image'
                      width={1562} height={1036} className='object-contain h-full w-full md:col-span-1'
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

                      <Image src='/images/screenshots/Dashboard/notes.png' alt='Dashboard Image'
                        width={1525} height={1043} className='object-contain h-full w-full md:col-span-1'
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

                    <Image src='/images/screenshots/claw-machine/full.png' alt='Clawmachine Image'
                      width={128} height={128} className='object-contain h-full w-full md:col-span-1'
                    />
                  </div>
                </li>
              </Link>
            </ul>

          </div>
        </div>

        {/* thanks for visiting my website */}
        <div className='w-full h-64 p-8 text-center grid content-center bg-white'>
          <p ref={fourthContent} className='
            text-3xl hover:text-4xl ease-in duration-200
            font-semibold text-stone-800
            animate__animated animate__slow fourthContent opacity-0
          '>Thank you for visiting my website :)</p>
        </div>
      </div>
    </>
  )
}
