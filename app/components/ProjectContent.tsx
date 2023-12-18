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
    readme: {
        skillsets: string
        bulletpoints: IBulletpoint[]
    }
    screenshots: IScreenshot[]
}

interface IScreenshot {
    map_key: number
    src: string
    description: string
}

interface IBulletpoint {
    map_key: number
    content: string
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
        <div className='flex flex-col'>
            <div className='px-2 flex gap-4 items-center'>
                <h1 className='text-4xl text-stone-800 font-semibold'>{ project.name }</h1>
                { project.link.length > 0 && (
                    <Link href={project.link} target='_blank'>
                        <FaLink className='pt-1 text-2xl text-stone-800' />
                    </Link>
                )}
            </div>

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
                    p-6 flex flex-col gap-4
                    rounded-b-xl shadow border-l-2 border-r-2 border-b-2 bg-white
                    text-lg
                '>
                    <p><span className='font-medium'>Skill(s) used:</span> { project.readme.skillsets }</p>
                    
                    <ul className='pl-6 list-disc'>
                        { project.readme.bulletpoints.map((bp: IBulletpoint) => {
                            return <li key={bp.map_key}>{ bp.content }</li>
                        }) }
                    </ul>
                </div>
            </div>

            <div className='my-12 mx-auto w-80 lg:w-auto lg:mx-0'>
                {/* https://react-slick.neostack.com/docs/api */}
                <Slider {...settings}>
                    { project.screenshots.map((item: IScreenshot) => {
                        return (
                            <div key={item.map_key} className='bg-stone-200 p-3 rounded-xl'>
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
    )
}

export default ProjectContent