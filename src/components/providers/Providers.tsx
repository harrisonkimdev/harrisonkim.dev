'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { MotionConfig } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { AppStateProvider } from '@/components/providers/AppStateContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <AppStateProvider>
        <ThemeProvider>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </ThemeProvider>
      </AppStateProvider>
    </SessionProvider>
  );
};

export default Providers; 