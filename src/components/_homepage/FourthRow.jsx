import { useEffect, useRef } from 'react'

const FourthRow = () => {
  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 1.0 // 100% of the element must be visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0')
          entry.target.classList.add('animate__bounce')
        } else {
          // if you want to add effect every time users scroll through
          entry.target.classList.add('opacity-0')
          entry.target.classList.remove('animate__bounce')
        }
      })
    }, observerOptions)

    if (fourthContent.current) {
      observer.observe(fourthContent.current)
    }

    return () => {
      if (fourthContent.current) {
        observer.unobserve(fourthContent.current)
      }
    }
  }, [])

  const fourthContent = useRef(null)

  return (
    <div className='w-full h-64 p-8 text-center grid content-center bg-white'>
      <p ref={fourthContent} className='
        text-3xl hover:text-4xl ease-in duration-200
        font-semibold text-stone-800
        animate__animated animate__slow fourthContent opacity-0
      '>idk, something else</p>
    </div>
  )
}

export default FourthRow