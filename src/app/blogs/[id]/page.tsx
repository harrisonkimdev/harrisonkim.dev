"use client"

import { IBlog } from "@/interfaces"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { convertDate } from "@/utils/functions"
import Image from "next/image"
import CommentContainer from "app/blogs/(components)/CommentContainer"
import { FaAngleLeft } from "react-icons/fa6"

const BlogShowPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  const [blog, setBlog] = useState<IBlog | undefined>(undefined)
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    const fetchBlog = async (id: string) => {
      try {
        const res = await fetch(`/api/blogs/${id}?readOnly=1`)
        const { blog } = await res.json()
        setBlog(blog)
      } catch (err) {
        console.error(err)
      }
    }

    fetchBlog(params.id)
  }, [params.id, refresh])

  return (
    <>
      { typeof window !== "undefined" && window.innerWidth >= 1024 && (
        <div onClick={() => router.back()} className="w-min">
          <FaAngleLeft className="text-xl text-lime-400" />
        </div>
      )}

      <>
        <h1 className="text-center text-lime-400">{ blog?.title }</h1>

        <Image 
          src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Blog Image" width={1024} height={786}
          className="pb-4"
        />

        {/* content */}
        { blog && (
          <div dangerouslySetInnerHTML={{ __html: blog.content }}
            className="text-lime-400"
          />
        )}

        {/* created at */}
        <div className="pt-8 text-end text-zinc-500">
          { convertDate(blog?.createdAt) }
        </div>
      </>

      {/* comment section */}
      <CommentContainer
        blogId={blog?._id} comments={blog?.comments}
        refreshPage={() => setRefresh(true)}
      />
    </>
  )
}

export default BlogShowPage