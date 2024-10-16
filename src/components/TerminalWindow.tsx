import { useState } from 'react'

const TerminalWindow = () => {
  const [filepath, setFilepath] = useState('')

  const tabClicked = (projectName: string) => {
    setFilepath(projectName)
  }

  return (
    <div className='h-full min-w-[44rem] flex flex-col justify-center'>
      {/* a group of project tabs */}
      <div className='flex'>
        <button onClick={() => { tabClicked('left-most') }}
          className={`
            w-full py-1.5
            whitespace-nowrap cursor-pointer
            rounded-tl-md bg-neutral-200 hover:bg-neutral-300
        `}> left-most </button>

        <button onClick={() => { tabClicked('right-most') }}
          className={`
            w-full py-1.5
            whitespace-nowrap cursor-pointer
            rounded-tr-md bg-neutral-200 hover:bg-stone-300
        `}> right-most </button>
      </div>

      {/* terminal */}
      <div className='
        h-80 px-2 pt-1 pb-20 rounded-b-md bg-black
        font-mono text-lime-400
      '>
        guest@harrisonkim-dev ~ % git clone { filepath }
        <span className='blink_me'>|</span>
      </div>
    </div>
  )
}

export default TerminalWindow