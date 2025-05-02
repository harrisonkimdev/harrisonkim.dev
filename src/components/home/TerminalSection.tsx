'use client';

import { useReducer, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

// 터미널 데이터
const terminalLines = [
  { prefix: '$ ', command: 'whoami', output: 'Harrison Kim' },
  { prefix: '$ ', command: 'cat skills.txt', output: 'JavaScript, TypeScript, React, Next.js, Node.js, Python, MongoDB, SQL, AWS' },
  { prefix: '$ ', command: 'cat experience.txt', output: 'Full-stack Developer with experience building modern web applications and services.' },
  { prefix: '$ ', command: 'cat interests.txt', output: 'Web Development, AI, Photography, Music, Travel' },
  { prefix: '$ ', command: 'cat contact.txt', output: 'Email: harrisonkimdev@gmail.com | LinkedIn: harrison-kim-b246a5175' },
  { prefix: '$ ', command: '', output: '' },
];

// 상태 타입
type TerminalState = {
  visibleLines: number;
};

// 액션 타입
type TerminalAction =
  | { type: 'INCREMENT_VISIBLE_LINES' };

// 리듀서 함수
const terminalReducer = (state: TerminalState, action: TerminalAction): TerminalState => {
  switch (action.type) {
    case 'INCREMENT_VISIBLE_LINES':
      return { ...state, visibleLines: state.visibleLines + 1 };
    default:
      return state;
  }
};

// 터미널 헤더 컴포넌트
const TerminalHeader = memo(() => (
  <div className="flex items-center gap-2 bg-gray-900 p-2 border-b border-gray-700">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
    <div className="w-3 h-3 rounded-full bg-green-500"></div>
    <span className="text-sm text-gray-400 ml-2">terminal — harrison@dev</span>
  </div>
));
TerminalHeader.displayName = 'TerminalHeader';

// 터미널 라인 컴포넌트
const TerminalLine = memo(({ line }: { line: { prefix: string; command: string; output: string; } }) => (
  <motion.div 
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
));
TerminalLine.displayName = 'TerminalLine';

// 커서 컴포넌트
const Cursor = memo(() => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center"
  >
    <span className="text-green-500">$ </span>
    <span className="w-2 h-4 bg-primary animate-blink"></span>
  </motion.div>
));
Cursor.displayName = 'Cursor';

const TerminalSection = () => {
  // 초기 상태
  const initialState: TerminalState = {
    visibleLines: 0
  };

  const [state, dispatch] = useReducer(terminalReducer, initialState);
  const { visibleLines } = state;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleLines < terminalLines.length) {
        dispatch({ type: 'INCREMENT_VISIBLE_LINES' });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="terminal-window w-full max-w-3xl mx-auto" data-testid="terminal-window">
      {/* Terminal header */}
      <TerminalHeader />
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm md:text-base">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <TerminalLine key={index} line={line} />
        ))}
        {visibleLines === terminalLines.length && <Cursor />}
      </div>
    </div>
  );
};

export default memo(TerminalSection); 