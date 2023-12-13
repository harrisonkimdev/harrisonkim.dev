import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Layout for Tablets & Desktops */}
      <div className='
        hidden items-center
        md:flex md:flex-col md:w-full
      '>
        {/* first */}
        <div className='
          w-full py-20 flex flex-col gap-16 items-center
          bg-stone-100
        '>
          <div className='flex gap-10 items-center'>
            <Image
              src="/images/profile/me_cropped.jpeg"
              alt="Profile picture of myself"
              width={2448} height={2334}
              quality={100}
              placeholder='blur'
              blurDataURL='/images/profile/me_cropped.jpeg'
              className='
                md:w-60
                md:h-60
                lg:w-72
                lg:h-72
                rounded-full
                object-cover
            '/>
            <div className=''>
              <h1 className='
                font-bold text-stone-500
                md:text-6xl
                lg:text-7xl 
              '>
                Hi, <br />
                <span className='whitespace-nowrap'>I&apos;m
                  <span className='text-stone-700'> Harrison</span>,
                </span> <br /> Full Stack <br /> Engineer
              </h1>
            </div>
          </div>
          <div className='
            p-3 rounded-lg border border-stone-600 shadow-md
            cursor-pointer hover:bg-stone-50
          '>
            <Link href="/assets/Harrison_Kim_Resume.pdf" target="_blank">
              <span className='font-medium text-stone-500'>Download Resumé</span>
            </Link>
          </div>
        </div>

        {/* second */}
        <div className='w-full bg-white md:px-10 lg:px-16 pt-10 pb-20'>
          <div className='max-w-5xl mx-auto'>

            <h2 className='text-5xl font-bold text-stone-800'>Here are my
              <span className='text-stone-500'> skill sets</span>
            </h2>

            <div className='grid grid-cols-3 md:gap-6 lg:gap-8 mt-6'>
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

        {/* third */}
        <div className='w-full bg-stone-300 md:px-10 pt-10 pb-16'>
          <div className='max-w-5xl mx-auto'>
            <h2 className='text-5xl font-bold text-stone-800'>
              <Link href='/projects'
                className='text-stone-500 hover:text-stone-600 hover:underline'
              >Projects</Link>
              <span> I&apos;ve been working on</span>
            </h2>

            <div className='mt-6'>
              <ul className='flex flex-col gap-4'>
                {/* dandycv */}
                <Link href='https://dandycv.vercel.app' target="_blank">
                  <li className='bg-stone-50 p-7 rounded-xl hover:bg-stone-100'>
                      <div className='grid grid-cols-4 gap-4'>
                        <div className='col-span-3'>
                          <h3 className='text-3xl font-bold text-stone-800'>dandycv</h3>
                          <h4 className='text-xl font-medium mt-2 text-stone-600'>Freelance work for a startup company</h4>
                          <p className='text-stone-800 mt-2'>As a freelance full-stack engineer, I collaborated with a startup, implementing NextAuth for authentication, integrating Stripe for payments, and establishing a streamlined email notification system with Resend. These solutions enhanced their online presence and functionality effectively.</p>
                        </div>

                        <Image src='/images/screenshots/dandycv/landing_page.png' alt='mosPic Image' width={1595} height={964}
                          className='object-contain h-full w-full col-span-1'
                        />
                      </div>
                  </li>
                </Link>

                {/* mosPic */}
                <Link href='/projects#mospic'>
                  <li className='bg-stone-50 p-7 rounded-xl hover:bg-stone-100'>
                    <div className='grid grid-cols-4 gap-4'>
                      <div className='col-span-3'>
                        <h3 className='text-3xl font-bold text-stone-800'>mos<span className='text-stone-500'>Pic</span></h3>
                        <h4 className='text-xl font-medium mt-2 text-stone-600'>
                          Image editing tool with the help of AI -
                          <Link href='https://segment-anything.com/' target="_blank" className='text-stone-800'> SAM</Link>
                        </h4>
                        <p className='text-stone-800 mt-2'>I am part of a team project that involves five individuals. As the project manager, my primary focus lies in crucial tasks such as iteration planning, effectively distributing tasks among team members, and actively listening to and considering the opinions of each team member.</p>
                      </div>

                      <Image src='/images/screenshots/mosPic/gallery-page.png' alt='mosPic Image' width={1562} height={1036}
                        className='object-contain h-full w-full col-span-1'
                      />
                    </div>
                  </li>
                </Link>

                {/* Dashboard */}
                <Link href='/projects#dashboard'>
                  <li className='bg-stone-50 p-7 rounded-xl hover:bg-stone-100'>
                      <div className='grid grid-cols-4 gap-4'>
                        <div className='col-span-3'>
                          <h3 className='text-3xl font-bold text-stone-800'>Dashboard</h3>
                          <h4 className='text-xl font-medium mt-2 text-stone-600'>An all-in-one office tool designed specifically for programmers.</h4>
                          <p className='text-stone-800 mt-2'>
                            Built with the latest stack incorporating Laravel and Vue.js, this all-in-one office tool takes advantage of cutting-edge technologies such as Inertia.js and Pinia. This updated tech stack enhances the performance and functionality of the tool, providing an optimized and seamless experience for programmers.
                          </p>
                        </div>

                        <Image src='/images/screenshots/Dashboard/notes.png' alt='Dashboard Image' width={1525} height={1043}
                          className='object-contain h-full w-full col-span-1'
                        />
                      </div>
                  </li>
                </Link>

                {/* Dashboard */}
                <Link href='/projects#threejs'>
                  <li className='bg-stone-50 p-7 rounded-xl hover:bg-stone-100'>
                    <div className='grid grid-cols-4 gap-4'>
                      <div className='col-span-3'>
                        <h3 className='text-3xl font-bold text-stone-800'>Claw machine</h3>
                        <h4 className='text-xl font-medium mt-2 text-stone-600'>Experience an immersive and interactive virtual claw machine powered by the advanced 3D modeling library, three.js.</h4>
                        <p className='text-stone-800 mt-2'>I had the opportunity to participate in an intriguing university project, and I am now planning to integrate the application into our website in the near future.</p>
                      </div>

                      <Image src='/images/screenshots/claw-machine/full.png' alt='Clawmachine Image' width={128} height={128}
                        className='object-contain h-full w-full col-span-1'
                      />
                    </div>
                  </li>
                </Link>
              </ul>
            </div>

          </div>
        </div>

        <div className='bg-white w-full h-64 text-center grid content-center'>
          <p className='text-3xl text-stone-800 font-semibold hover:text-4xl ease-in duration-200'>Thank you for visiting my website :)</p>
        </div>
      </div>

      {/* Layout for smartphones */}
      <div className='flex flex-col md:hidden items-center'>
        {/* first */}
        <div className='bg-stone-100 w-full flex flex-col gap-8 items-center px-6 py-10'>
          <Image src="/images/profile/me_cropped.jpeg" alt="Profile picture of myself" width={2448} height={2334}
            className='
              w-72
              h-72
              rounded-full
            '
          />
          <p className='text-5xl font-bold text-stone-500 dark:text-stone-300'>
            Hi, <br />
            <span className='whitespace-nowrap'>I&apos;m
              <span className='text-stone-700'> Harrison</span>,
            </span> <br /> Full Stack <br /> Engineer
          </p>
        </div>

        {/* second */}
        <div className='w-full bg-white md:px-10 px-6 pt-10 pb-12'>
          <h2 className='text-5xl font-bold text-stone-800'>Here are my
            <span className='text-stone-500'> skill sets</span>
          </h2>

          <div className='grid grid-rows-3 gap-5 mt-6'>
            <div className='px-8 py-6 rounded-lg text-center bg-stone-100 shadow-md hover:bg-stone-50'>
              <h4 className='text-2xl font-medium text-stone-800'>Frontend</h4>
              <ul className='mt-2 h-32'>
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
            <div className='px-8 py-6 rounded-lg text-center bg-stone-100 shadow-md hover:bg-stone-50'>
              <h4 className='text-2xl font-medium text-stone-800'>Backend</h4>
              <ul className='mt-2 h-32'>
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
            <div className='px-8 py-6 rounded-lg text-center bg-stone-100 shadow-md hover:bg-stone-50'>
              <h4 className='text-2xl font-medium text-stone-800'>Others</h4>
              <ul className='mt-2 h-32'>
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

        {/* third */}
        <div className='w-full bg-stone-300 px-6 pt-10 pb-12'>
          <div className='max-w-5xl mx-auto'>
            <h2 className='text-5xl font-bold text-stone-800'>
              <Link href='/projects'
                className='text-stone-500 hover:underline'
              >Projects</Link>
              <span> I&apos;ve been working on</span>
            </h2>

            <div className='mt-6'>
              <ul className='flex flex-col gap-4'>
                {/* dandycv */}
                <Link href='https://dandycv.vercel.app' target="_blank">
                  <li className='bg-stone-50 p-7 rounded-xl hover:bg-stone-100'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-3xl font-bold text-stone-800'>dandycv</h3>
                      <p className='text-xl font-medium text-stone-600'>Freelance work for a startup company</p>
                      <p className='text-stone-800'>As a freelance full-stack engineer, I collaborated with a startup, implementing NextAuth for authentication, integrating Stripe for payments, and establishing a streamlined email notification system with Resend. These solutions enhanced their online presence and functionality effectively.</p>

                      <Image src='/images/screenshots/dandycv/landing-page.png' alt='mosPic Image' width={1595} height={964}
                        className='object-contain h-full w-full'
                      />
                    </div>
                  </li>
                </Link>

                {/* mosPic */}
                <Link href='/projects#mospic'>
                  <li className='bg-stone-50 p-7 rounded-xl hover:bg-stone-100'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-3xl font-bold text-stone-800'>mos<span className='text-stone-500'>Pic</span></h3>
                      <p className='text-xl font-medium text-stone-600'>Image editing tool with the help of AI - 
                        <Link href='https://segment-anything.com/' target="_blank" className='text-stone-800'> SAM</Link>
                      </p>
                      <p className='text-stone-800'>
                        I am part of a team project that involves five individuals. As the project manager, my primary focus
                        lies in crucial tasks such as iteration planning, effectively distributing tasks among team members,
                        and actively listening to and considering the opinions of each team member.
                      </p>

                      <Image src='/images/screenshots/mosPic/gallery-page.png' alt='mosPic Image' width={128} height={128}
                        className='object-contain h-full w-full'
                      />
                    </div>
                  </li>
                </Link>

                {/* Dashboard */}
                <Link href='/projects#dashboard'>
                  <li className='bg-stone-50 p-7 rounded-xl hover:bg-stone-100'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-3xl font-bold text-stone-800'>Dashboard</h3>
                      <p className='text-xl font-medium text-stone-600'>An all-in-one office tool designed specifically for programmers.</p>
                      <p className='text-stone-800'>
                        Built with the latest stack incorporating Laravel and Vue.js, this all-in-one office tool takes advantage
                        of cutting-edge technologies such as Inertia.js and Pinia. This updated tech stack enhances the performance
                        and functionality of the tool, providing an optimized and seamless experience for programmers.
                      </p>

                      <Image src='/images/screenshots/Dashboard/blocksix.png' alt='Dashboard Image' width={128} height={128}
                        className='object-contain h-full w-full'
                      />
                    </div>
                  </li>
                </Link>

                {/* Claw Machine */}
                <Link href='/projects#threejs'>
                  <li className='bg-stone-50 p-7 rounded-xl hover:bg-stone-100'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-3xl font-bold text-stone-800'>Claw machine</h3>
                      <p className='text-xl font-medium text-stone-600'>Experience an immersive and interactive virtual claw machine powered by the advanced 3D modeling library, three.js.</p>
                      <p className='text-stone-800'>I had the opportunity to participate in an intriguing university project, and I am now planning to integrate the application into our website in the near future.</p>

                      <Image src='/images/screenshots/claw-machine/full.png' alt='Clawmachine Image' width={128} height={128}
                        className='object-contain h-full w-full'
                      />
                    </div>
                  </li>
                </Link>
              </ul>
            </div>

          </div>
        </div>

        <div className='bg-white w-full h-32 text-center grid content-center'>
          <p className='text-2xl text-stone-800 font-semibold hover:text-3xl ease-in duration-200'>
            Thank you for visiting :)
          </p>
        </div>
      </div>
    </>
  )
}
