"use client"

import { IBlog } from "@/interfaces"
import { useRouter } from "next/navigation"
import { useReducer, useEffect, memo } from "react"
import { convertDate } from "@/lib/functions"
import Image from "next/image"
import CommentContainer from "app/blogs/(components)/CommentContainer"
import { FaAngleLeft } from "react-icons/fa6"

// 상태 타입
type BlogState = {
  blog: IBlog | undefined
  refresh: boolean
}

// 액션 타입
type BlogAction =
  | { type: 'SET_BLOG', payload: IBlog }
  | { type: 'REFRESH' }

// 리듀서 함수
const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
  switch (action.type) {
    case 'SET_BLOG':
      return { ...state, blog: action.payload }
    case 'REFRESH':
      return { ...state, refresh: !state.refresh }
    default:
      return state
  }
}

// 뒤로 가기 버튼 컴포넌트
const BackButton = memo(({ onClick }: { onClick: () => void }) => (
  <div onClick={onClick} className="w-min cursor-pointer">
    <FaAngleLeft className="text-xl text-lime-400" />
  </div>
))
BackButton.displayName = 'BackButton'

// 블로그 콘텐츠 컴포넌트
const BlogContent = memo(({ blog }: { blog: IBlog }) => (
  <>
    <div 
      dangerouslySetInnerHTML={{ __html: blog.content }}
      className="py-4 text-lime-400"
    />

    <div className='flex flex-wrap gap-3 p-2'>
      {blog.tags.map((tag: string, index: number) => (
        <span key={index} className='
          w-min px-3 py-1 rounded-lg
          border border-dashed border-lime-400
          whitespace-nowrap text-sm text-lime-400
        '> {tag} </span>
      ))}
    </div>
  </>
))
BlogContent.displayName = 'BlogContent'

// 블로그 이미지 컴포넌트
const BlogImage = memo(() => (
  <Image 
    src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Blog Image" width={1024} height={786}
  />
))
BlogImage.displayName = 'BlogImage'

const BlogShowPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  // 초기 상태
  const initialState: BlogState = {
    blog: undefined,
    refresh: false
  }

  const [state, dispatch] = useReducer(blogReducer, initialState)
  const { blog, refresh } = state

  useEffect(() => {
    const fetchBlog = async (id: string) => {
      try {
        const res = await fetch(`/api/blogs/${id}?readOnly=1`)
        const { blog } = await res.json()
        dispatch({ type: 'SET_BLOG', payload: blog })
      } catch (err) {
        console.error(err)
      }
    }

    fetchBlog(params.id)
  }, [params.id, refresh])

  const handleRefresh = () => dispatch({ type: 'REFRESH' })

  return (
    <>
      {typeof window !== "undefined" && window.innerWidth >= 1024 && (
        <BackButton onClick={() => router.back()} />
      )}

      <>
        <h1 className="text-center text-lime-400">{blog?.title}</h1>

        <BlogImage />

        {/* content and tags */}
        {blog && <BlogContent blog={blog} />}

        {/* created at */}
        <div className="text-end text-zinc-500">
          {convertDate(blog?.createdAt)}
        </div>
      </>

      {/* comment section */}
      <CommentContainer
        blogId={blog?._id} 
        comments={blog?.comments}
        refreshPage={handleRefresh}
      />
    </>
  )
}

export default memo(BlogShowPage)