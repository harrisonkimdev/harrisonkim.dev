import '@testing-library/jest-dom'
import React from 'react'

// window.matchMedia 모킹
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// structuredClone polyfill
if (typeof global.structuredClone !== 'function') {
  global.structuredClone = function(value) {
    return JSON.parse(JSON.stringify(value));
  };
}

// framer-motion 관련 모킹
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    section: ({ children, ...props }: any) => React.createElement('section', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
  MotionConfig: ({ children }: any) => children,
}))

// React 관련 경고 억제
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes?.('Warning: An update to') ||
    args[0]?.includes?.('act(...)') ||
    args[0]?.includes?.('React does not recognize the') ||
    args[0]?.includes?.('Each child in a list should have a unique "key"')
  ) {
    return;
  }
  originalConsoleError(...args);
}; 