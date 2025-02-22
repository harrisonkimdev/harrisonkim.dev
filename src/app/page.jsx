import Image from 'next/image'
import Link from 'next/link'

// Home component
export default function Home() {
  return (
    <div className="flex flex-col gap-16 items-center">
      {/* Site title */}
      <div className='text-center'>
        <h2 className="font-mono font-extralight text-lime-400">
          <span className='blink_me'>hello, world!</span>
        </h2>
      </div>

      <div className='flex flex-col gap-6'>
        {/* LinkedIn link */}
        <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/'>
          <div className='
            flex flex-row gap-3 justify-center items-center
            h-12 px-28 rounded-full bg-zinc-900 hover:bg-lime-500 ease-in duration-200
          '>
            <Image src='/images/logos/LinkedIn.png' alt='LinkedIn Logo'
              width={256} height={256} className='object-contain w-6 h-6'
            />
            <span className='
              mt-0.5 font-sans font-extralight text-lg text-white
            '>LinkedIn</span>
          </div>
        </Link>

        {/* GitHub link */}
        <Link href='https://github.com/hhkimmm9'>
          <div className='
            flex flex-row gap-3 justify-center items-center
            h-12 px-28 rounded-full bg-zinc-900 hover:bg-lime-500 ease-in duration-200
          '>
            <Image src='/images/logos/GitHub_Invertocat_Light.png' alt='GitHub Logo'
              width={407} height={400} className='object-contain w-6 h-6'
            />
            <span className='
              mt-0.5 font-sans font-extralight text-lg text-white
            '>GitHub</span>
          </div>
        </Link>

        {/* Resume link */}
        <Link href='/assets/Harrison_Kim_Resume.pdf' target='_blank'>
          <div className='
            flex flex-row gap-2.5 justify-center items-center
            h-12 px-28 rounded-full bg-zinc-900 hover:bg-lime-500 ease-in duration-200
          '>
            <span className='mt-1'>📃</span>
            <span className='
              font-sans font-extralight text-lg text-white
            '>Resumé</span>
          </div>
        </Link>

        {/* Email link */}
        <a href='mailto:harrisonkimdev@gmail.com' target='_blank'>
          <div className='
            flex flex-row gap-2.5 justify-center items-center
            h-12 px-28 rounded-full bg-zinc-900 hover:bg-lime-500 ease-in duration-200
          '>
            <span className='mt-1'>📧</span>
            <span className='font-sans font-extralight text-lg text-white'>
              Email
            </span>
          </div>
        </a>

        {/* Contact me link */}
        <Link href='/contact-me'>
          <div className='
            flex flex-row gap-2.5 justify-center items-center
            h-12 px-28 rounded-full bg-zinc-900 hover:bg-lime-500 ease-in duration-200
          '>
            <span className='mt-1'>📆</span>
            <span className='
              font-sans font-extralight text-lg text-white
            '>Let&apos;s chat</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
