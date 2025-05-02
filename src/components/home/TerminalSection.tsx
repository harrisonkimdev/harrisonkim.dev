'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  
  const terminalLines = [
    { prefix: '$ ', command: 'whoami', output: 'Harrison Kim' },
    { prefix: '$ ', command: 'cat skills.txt', output: 'JavaScript, TypeScript, React, Next.js, Node.js, Python, MongoDB, SQL, AWS' },
    { prefix: '$ ', command: 'cat experience.txt', output: 'Full-stack Developer with experience building modern web applications and services.' },
    { prefix: '$ ', command: 'cat interests.txt', output: 'Web Development, AI, Photography, Music, Travel' },
    { prefix: '$ ', command: 'cat contact.txt', output: 'Email: harrisonkimdev@gmail.com | LinkedIn: harrison-kim-b246a5175' },
    { prefix: '$ ', command: '', output: '' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleLines < terminalLines.length) {
        setVisibleLines(prevLines => prevLines + 1);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [visibleLines, terminalLines.length]);

  return (
    <div className="terminal-window w-full max-w-3xl mx-auto" data-testid="terminal-window">
      {/* Terminal header */}
      <div className="flex items-center gap-2 bg-gray-900 p-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm text-gray-400 ml-2">terminal — harrison@dev</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm md:text-base">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-1"
          >
            <span className="text-green-500">{line.prefix}</span>
            <span className="text-white">{line.command}</span>
            {line.output && (
              <div className="text-gray-300 pl-4">
                {line.output}
              </div>
            )}
          </motion.div>
        ))}
        {visibleLines === terminalLines.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <span className="text-green-500">$ </span>
            <span className="w-2 h-4 bg-primary animate-blink"></span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TerminalSection; 