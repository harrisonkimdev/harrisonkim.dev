'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiFile, FiMail, FiMessageCircle } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import TerminalSection from '@/components/home/TerminalSection';
// import DinosaurGame from '@/components/DinosaurGame';

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-mono font-extralight mb-3">
            <span className="text-primary animate-blink">$</span> Hello, World!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            I&apos;m Harrison Kim, a software developer focused on creating elegant solutions with modern technologies.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex flex-col gap-4 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="https://www.linkedin.com/in/harrison-kim-b246a5175/" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center gap-3 bg-accent hover:bg-primary hover:text-black py-3 px-6 rounded-full transition-all duration-300">
              <FiLinkedin size={20} />
              <span className="font-light">LinkedIn</span>
            </div>
          </Link>

          <Link href="https://github.com/harrisonkimdev" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center gap-3 bg-accent hover:bg-primary hover:text-black py-3 px-6 rounded-full transition-all duration-300">
              <FiGithub size={20} />
              <span className="font-light">GitHub</span>
            </div>
          </Link>

          <Link href="/assets/Harrison_Kim_Resume.pdf" target="_blank">
            <div className="flex items-center justify-center gap-3 bg-accent hover:bg-primary hover:text-black py-3 px-6 rounded-full transition-all duration-300">
              <FiFile size={20} />
              <span className="font-light">Resumé</span>
            </div>
          </Link>

          <a href="mailto:harrisonkimdev@gmail.com">
            <div className="flex items-center justify-center gap-3 bg-accent hover:bg-primary hover:text-black py-3 px-6 rounded-full transition-all duration-300">
              <FiMail size={20} />
              <span className="font-light">Email</span>
            </div>
          </a>

          <Link href="/contact-me">
            <div className="flex items-center justify-center gap-3 bg-accent hover:bg-primary hover:text-black py-3 px-6 rounded-full transition-all duration-300">
              <FiMessageCircle size={20} />
              <span className="font-light">Let&apos;s Chat</span>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Terminal Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="section-title text-2xl mb-6">About Me</h2>
        <TerminalSection />
      </motion.section>

      {/* Dinosaur Game Easter Egg - Temporarily hidden
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="section-title text-2xl mb-6">Take a Break</h2>
        <DinosaurGame />
      </motion.section>
      */}
    </div>
  );
} 