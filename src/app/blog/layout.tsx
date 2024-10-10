import BlogSidebar from 'app/blog/_components/BlogSidebar'

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-5xl mx-auto p-8 md:p-16'>
      { children }
    </div>
  )
}

export default BlogLayout