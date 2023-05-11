import './styles/welcome.css'

export default function Home() {
  return (
    <div className='wrapper'>
      <img src="/images/space.jpg" alt="" className='background' />
      <header className='relaitve'>
        <img src="/images/astronaut.png" alt="" className='foreground' />
        <div className='text-center'>
          <p className='title text-5xl font-extrabold'>Harrison Kim</p>
          <p className='title text-xl font-bold'>Full Stack Engineer</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 absolute bottom-8 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </header>

      <section className='flex flex-col gap-6'>
        <div className='max-w-sm md:max-w-lg lg:max-w-3xl mx-auto'>
          <p className='text-2xl text-center'>Hello, world!</p>
          <p className='mt-3'>My name is <a href="https://www.linkedin.com/in/harrison-kim-b246a5175/" className='hover:underline'>Harrison Kim</a> and
            I am a <a href="https://github.com/hhkimmm9" className='hover:underline'>full-stack engineer</a>.
          </p>
          
        </div>
        <div className='flex justify-center my-2'>
          <p><a href="/home" className='hover:text-2xl ease-in duration-100'>Welcome to my website!</a></p>
          {/* <button className='px-2 py-1 bg-zinc-300 shadow rounded-xl text-black hover:bg-zinc-200'>
            Enter
          </button> */}
        </div>
      </section>
    </div>
  )
}
