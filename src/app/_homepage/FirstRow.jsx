import Image from 'next/image'
import Link from 'next/link'

const FirstRow = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className='
      w-full min-h-screen md:h-full px-8 md:py-72 bg-stone-100 
      flex flex-col gap-8 md:gap-16 justify-center items-center
    '>
      {/* profile picture and greeting */}
      <div className='px-8 md:px-0 flex flex-col md:flex-row md:gap-10 items-center'>
        <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/' target='_blank'>
          <Image
            src='/images/profile/me_cropped.jpeg'
            alt='Profile picture of myself'
            width={256} height={256}
            placeholder='blur'
            blurDataURL='/images/profile/me_cropped.jpeg'
            className='
              w-[256px]
              h-[256px]
              rounded-full
              object-cover
            '
          />
        </Link>
        <h1 className='
          text-5xl md:text-7xl font-bold text-stone-500
          animate__animated animate__pulse animate__repeat-3
        '>
          Hi, <br />
          <span className='whitespace-nowrap'>I&apos;m
            <Link href='/admin/login'>
              <span className='text-stone-700'> Harrison</span>
            </Link>,
          </span> <br /> Full Stack <br /> Engineer
        </h1>
      </div>

      {/* buttons */}
      <div className='flex flex-col gap-10'>
        <div className='grid grid-cols-2 gap-4 md:gap-8'>
          <div className='
            p-3 rounded-lg border border-stone-600 shadow-md
            text-center cursor-pointer hover:bg-stone-50
          '>
            <Link href='/assets/Harrison_Kim_Resume.pdf' target='_blank'>
              <span className='font-medium text-stone-500'>Download Resumé</span>
            </Link>
          </div>
          <div className='
            p-3 rounded-lg border border-stone-600 shadow-md
            text-center cursor-pointer hover:bg-stone-50
          '>
            <Link href='/contact-me'>
              <span className='font-medium text-stone-500'>Contact me</span>
            </Link>
          </div>
        </div>

        {/* click to go to the bottom of the page to try the dinosaur game */}
        <button onClick={scrollToBottom}
          className='hidden md:block hover:scale-125 ease-in duration-150
        '>
          <div className='
            p-3 rounded-lg border border-stone-600 shadow-md
            text-center cursor-pointer hover:bg-stone-50
          '>
            <span className='font-medium text-stone-500'>Latest Project. Please Try Me!</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default FirstRow