import Image from 'next/image'

const MacOSStyleWindow = () => {
  return (
    <div>
      <div className='
        flex flex-row items-center
        rounded-t-xl border bg-white
      '>
        <Image src='/images/projects/macos-buttons.webp' alt=''
          width={800} height={600} className='w-16 ml-2'
        />
        <span className='
          py-1 font-medium text-base
        '>README.md</span>
      </div>

      {/* README */}
      <div className='
        flex flex-col gap-4 px-4 pt-3 pb-16
        rounded-b-xl border-l border-r border-b bg-white
        text-lg
      '>
        content
      </div>
    </div>
  )
}

export default MacOSStyleWindow