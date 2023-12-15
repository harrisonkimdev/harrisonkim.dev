import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
import '@/globals.css'
import Link from 'next/link'
import { FaLink } from "react-icons/fa6";

interface IProject {
  name: string
  link: string
  readme: string
  screenshots: []
}

interface IScreenshots {
  id: string
  src: string
  description: string
}

const ProjectContent = ({ project }: { project: IProject }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    arrows: true,
    draggable: true,
    swipeToSlide: true,
    swipe: true,
  }
  
  return (
    <>
      <div className='flex flex-col'>
        <Link href={project.link} target='_blank' className='w-min px-2 flex gap-4 items-center'>
          <h1 className='text-4xl text-stone-800 font-semibold'>{ project.name }</h1>
          <FaLink className='pt-1 text-2xl text-stone-800' />
        </Link>

        <div className='mt-6'>
          {/*  */}
          <div className='
            border
            flex
            flex-row
            items-center
            border-b-2
            rounded-t-xl
            shadow-inner
            bg-white
          '>
            <Image src="/images/macos-buttons.webp" alt=""
              width={800} height={600} className='w-16 ml-2'
            />
            <span className='
              py-1
              text-base
              font-semibold
            '>README.md</span>
          </div>

          {/* README */}
          <div className='
            p-6 text-lg
            rounded-b-xl shadow border-l-2 border-r-2 border-b-2 bg-white
          '>
            <text dangerouslySetInnerHTML={{ __html: project.readme }} />
          </div>
        </div>

        <div className='my-12 mx-auto w-80 lg:w-auto lg:mx-0'>
          {/* https://react-slick.neostack.com/docs/api */}
          <Slider {...settings}>
            { project.screenshots.map((item: IScreenshots) => {
              return (
                  <div key={item.id} className='bg-stone-200 p-3 rounded-xl'>
                    <div className='flex flex-col'>
                      <Image src={item.src} alt=''
                        width={1024} height={786}
                        className='object-contain rounded-t-xl'
                      />
                      <div className='p-4 bg-stone-100 rounded-b-xl'>
                        <p className='text-stone-800'>{ item.description }</p>
                      </div>
                    </div>
                  </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default ProjectContent