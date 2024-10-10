import Link from 'next/link'
import Image from 'next/image'
// import DinosaurGame from '@/components/DinosaurGame'

const Footer = () => {
  return (
    <footer className='
      flex flex-row gap-12 justify-center items-center px-8 py-12 bg-white
    '>
      {/* LinkedIn */}
      <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/'
        className='flex flex-row gap-2 items-center'
      >
        <Image src='/images/logos/linkedin-logo.png' alt='LinkedIn Logo'
          width={512} height={512} className='object-contain w-8 h-8'
        />
        <p className='
          mt-0.5 font-extralight text-lg text-black
        '>LinkedIn</p>
      </Link>

      {/* GitHub */}
      <Link href='https://github.com/hhkimmm9'
        className='flex flex-row gap-2 items-center'
      >
        <Image src='/images/logos/github-logo.png' alt='GitHub Logo'
          width={512} height={512} className='object-contain w-8 h-8'
        />
        <p className='
          mt-0.5 font-extralight text-lg text-black
        '>GitHub</p>
      </Link>

      {/* TODO: move the game to a dedicated page */}
      {/* { pathname === '/' ? (
        <div className='hidden md:block'>
          <DinosaurGame />
        </div>
      ) : (
        <></>
      )} */}
    </footer>
  )
}

export default Footer