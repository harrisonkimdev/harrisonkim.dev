"use client"

import { FaAngleUp } from "react-icons/fa6"

const TopArrow = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"  // This will create a smooth scrolling effect
    })
  }

  return (
    <button type="button" onClick={() => scrollToTop()}
      className="
        hidden lg:block fixed bottom-4 right-6 p-2
        rounded-xl border border-lime-400
    ">
      <FaAngleUp className="text-lime-400" />
    </button>
  )
}

export default TopArrow