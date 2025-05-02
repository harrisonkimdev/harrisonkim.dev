'use client';

import Link from 'next/link';
import { FiCalendar, FiTag } from 'react-icons/fi';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  // Format date to be more readable
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Create a brief excerpt if one isn't provided
  const excerpt = blog.excerpt || blog.content.slice(0, 150) + '...';
  
  return (
    <Link href={`/blogs/${blog._id}`}>
      <article className="card h-full flex flex-col p-6 hover:transform hover:translate-y-[-5px] transition-all duration-300">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">{blog.title}</h2>
          
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <div className="flex items-center gap-1">
              <FiCalendar size={14} />
              <span>{formattedDate}</span>
            </div>
            
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <FiTag size={14} />
                <span>{blog.tags[0]}{blog.tags.length > 1 ? ` +${blog.tags.length - 1}` : ''}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-300 line-clamp-3">
            {excerpt}
          </p>
        </div>
        
        <div className="mt-auto">
          <span className="text-primary hover:underline">Read more →</span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard; 