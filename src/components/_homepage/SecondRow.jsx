import { useEffect, useRef } from 'react'
import { FaDisplay, FaDatabase, FaToolbox } from 'react-icons/fa6'

const SecondRow = () => {
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
        } else {
          // if you want to add effect every time users scroll through
          if (entry.target.className.includes('secondRowTitle')) {
            entry.target.classList.add('opacity-0')
            entry.target.classList.remove('animate__fadeIn')
          }
        }
      })
    }, observerOptions)

    activateObservers(observer)
  
    return () => {
      inactivateObservers(observer)
    }
  }, [])

  const secondRowTitle = useRef(null)
  const secondRowCard1 = useRef(null)
  const secondRowCard2 = useRef(null)
  const secondRowCard3 = useRef(null)

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
  }

  return (
    <div className='
      w-full h-full px-8 py-12 md:pt-28 md:pb-40
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
              <FaDisplay className='text-7xl text-stone-500' />
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
              <FaDatabase className='text-7xl text-stone-500' />
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
              <FaToolbox className='text-7xl text-stone-500' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondRow