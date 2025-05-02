'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-mono">
          <span className="text-primary font-bold">{'>'}</span>
          <span className="text-white font-light">harrisonkim.dev</span>
          <span className="blink-cursor text-primary">_</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/projects" className="nav-link">
            Projects
          </Link>
          <Link href="/blogs" className="nav-link">
            Blog
          </Link>
          <Link href="/contact-me" className="nav-link">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-primary"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-accent/95 backdrop-blur-sm">
          <nav className="flex flex-col py-4 px-4">
            <Link 
              href="/projects" 
              className="nav-link py-3 border-b border-gray-800"
            >
              Projects
            </Link>
            <Link 
              href="/blogs" 
              className="nav-link py-3 border-b border-gray-800"
            >
              Blog
            </Link>
            <Link 
              href="/contact-me" 
              className="nav-link py-3"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 