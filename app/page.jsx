import Image from 'next/image'
import Link from 'next/link'
import 'animate.css'

export default function Home() {
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
            '>
              Hi, <br />
              <span className='whitespace-nowrap'>I&apos;m
                <span className='text-stone-700'> Harrison</span>,
              </span> <br /> Full Stack <br /> Engineer
            </h1>
          </div>

          {/* buttons */}
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
              <span className='animate__animated animate__fadeIn text-stone-500'> skill sets</span>
            </h2>

            {/* cards */}
            <div className='
              grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-6 mt-6
              animate__animated animate__backInLeft ease-in duration-300
            '>
              {/* frontend */}
              <div className='px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md hover:bg-stone-50'>
                <h4 className='text-center text-2xl font-medium text-stone-800'>Frontend</h4>
                <ul className='h-36 mt-2 text-center'>
                  <li><p className='text-lg text-stone-800'>Next.js (React.js)</p></li>
                  <li><p className='text-lg text-stone-800'>Vue.js</p></li>
                  <li><p className='text-lg text-stone-800'>Tailwind</p></li>
                  <li><p className='text-lg text-stone-800'>TypeScript</p></li>
                </ul>
                <div className='flex justify-center left-0 right-0 bottom-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 h-20 text-stone-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
              </div>
              {/* backend */}
              <div className='px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md hover:bg-stone-50'>
                <h4 className='text-center text-2xl font-medium text-stone-800'>Backend</h4>
                <ul className='h-36 mt-2 text-center'>
                <li><p className='text-lg text-stone-800'>Laravel & Node.js</p></li>
                  <li><p className='text-lg text-stone-800'>SQL & NoSQL (MongoDB)</p></li>
                  <li><p className='text-lg text-stone-800'>AWS & nginx</p></li>
                </ul>
                <div className='flex justify-center left-0 right-0 bottom-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 h-20 text-stone-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>

                </div>
              </div>
              {/* others */}
              <div className='px-8 py-6 rounded-lg text-left bg-stone-100 shadow-md hover:bg-stone-50'>
                <h4 className='text-center text-2xl font-medium text-stone-800'>Others</h4>
                <ul className='h-36 mt-2 text-center'>
                  <li><p className='text-lg text-stone-800'>Git & Jira</p></li>
                  <li><p className='text-lg text-stone-800'>Figma</p></li>
                  <li><p className='text-lg text-stone-800'>Python & Java (OOP)</p></li>
                </ul>
                <div className='flex justify-center left-0 right-0 bottom-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 h-20 text-stone-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
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
              <Link href='https://dandycv.vercel.app' target="_blank" className='animate__animated animate__slideInLeft'>
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

                    <Image src='/images/screenshots/dandycv/landing_page.png' alt='mosPic Image' width={1595} height={964}
                      className='object-contain h-full w-full md:col-span-1'
                    />
                  </div>
                </li>
              </Link>

              {/* mosPic */}
              <Link href='/projects#mospic' className='animate__animated animate__slideInLeft'>
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

                    <Image src='/images/screenshots/mosPic/gallery-page.png' alt='mosPic Image' width={1562} height={1036}
                      className='object-contain h-full w-full md:col-span-1'
                    />
                  </div>
                </li>
              </Link>

              {/* Dashboard */}
              <Link href='/projects#dashboard' className='animate__animated animate__slideInLeft'>
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

                      <Image src='/images/screenshots/Dashboard/notes.png' alt='Dashboard Image' width={1525} height={1043}
                        className='object-contain h-full w-full md:col-span-1'
                      />
                    </div>
                </li>
              </Link>

              {/* Claw Machine */}
              <Link href='/projects#threejs' className='animate__animated animate__slideInLeft'>
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

                    <Image src='/images/screenshots/claw-machine/full.png' alt='Clawmachine Image' width={128} height={128}
                      className='object-contain h-full w-full md:col-span-1'
                    />
                  </div>
                </li>
              </Link>
            </ul>

          </div>
        </div>

        <div className='w-full h-64 p-8 text-center grid content-center bg-white'>
          <p className='
            text-3xl hover:text-4xl ease-in duration-200
            font-semibold text-stone-800
            animate__animated animate__bounce
          '>Thank you for visiting my website :)</p>
        </div>
      </div>
    </>
  )
}
