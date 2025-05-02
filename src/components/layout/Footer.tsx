import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-accent py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h3 className="text-xl font-mono mb-2">
              <span className="text-primary">{'>'}</span> harrisonkim.dev
            </h3>
            <p className="text-gray-400 text-sm">
              Built with Next.js and TailwindCSS
            </p>
          </div>

          <div className="flex space-x-6">
            <Link 
              href="https://github.com/harrisonkimdev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/harrison-kim-b246a5175/"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </Link>
            <Link 
              href="mailto:harrisonkimdev@gmail.com"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <FiMail size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {year} Harrison Kim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 