"use client"

import { useReducer, useEffect, useMemo } from "react"
import { FiSearch } from "react-icons/fi"
import BlogCard from "@/components/blogs/BlogCard"
import { memo } from "react"

interface Blog {
  _id: string
  title: string
  content: string
  excerpt?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

// 상태 타입
type BlogsState = {
  blogs: Blog[]
  loading: boolean
  searchQuery: string
}

// 액션 타입
type BlogsAction =
  | { type: 'SET_BLOGS', payload: Blog[] }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_SEARCH_QUERY', payload: string }

// 리듀서 함수
const blogsReducer = (state: BlogsState, action: BlogsAction): BlogsState => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    default:
      return state
  }
}

// 로딩 상태 컴포넌트
const LoadingSpinner = memo(() => (
  <div className="flex justify-center my-12">
    <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>
  </div>
))
LoadingSpinner.displayName = 'LoadingSpinner'

// 검색 바 컴포넌트
const SearchBar = memo(({ 
  searchQuery, 
  onSearchChange 
}: { 
  searchQuery: string
  onSearchChange: (query: string) => void 
}) => (
  <div className="relative mt-6 mb-8">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiSearch className="text-gray-400" />
    </div>
    <input
      type="text"
      className="w-full py-2 pl-10 pr-4 bg-accent border border-gray-800 rounded-md focus:outline-none focus:border-primary"
      placeholder="Search articles..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
))
SearchBar.displayName = 'SearchBar'

// 빈 상태 컴포넌트
const EmptyState = memo(({ searchQuery }: { searchQuery: string }) => (
  <div className="text-center py-16">
    <h3 className="text-xl font-mono text-primary mb-2">No blog posts found</h3>
    <p className="text-gray-400">
      {searchQuery 
        ? "Try a different search query"
        : "I'm working on new content. Check back soon!"}
    </p>
  </div>
))
EmptyState.displayName = 'EmptyState'

// 블로그 목록 컴포넌트
const BlogList = memo(({ blogs }: { blogs: Blog[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {blogs.map(blog => (
      <BlogCard key={blog._id} blog={blog} />
    ))}
  </div>
))
BlogList.displayName = 'BlogList'

const BlogsPage = () => {
  // 초기 상태
  const initialState: BlogsState = {
    blogs: [],
    loading: true,
    searchQuery: ""
  }

  const [state, dispatch] = useReducer(blogsReducer, initialState)
  const { blogs, loading, searchQuery } = state

  // 데이터 가져오기
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        const res = await fetch("/api/blogs")
        const data = await res.json()
        
        if (Array.isArray(data.blogs)) {
          dispatch({ type: 'SET_BLOGS', payload: data.blogs })
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    
    fetchBlogs()
  }, [])
  
  // 검색 쿼리 변경 핸들러
  const handleSearchChange = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  }
  
  // 필터링된 블로그 - useMemo로 최적화
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.content && blog.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [blogs, searchQuery])

  return (
    <div className="flex flex-col">
      <h1 className="section-title text-3xl">Blog</h1>
      
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : filteredBlogs.length > 0 ? (
        <BlogList blogs={filteredBlogs} />
      ) : (
        <EmptyState searchQuery={searchQuery} />
      )}
    </div>
  )
}

export default BlogsPage