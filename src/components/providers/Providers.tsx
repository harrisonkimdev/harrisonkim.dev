'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { MotionConfig } from 'framer-motion';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
};

export default Providers; 