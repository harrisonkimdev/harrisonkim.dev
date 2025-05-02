import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/providers/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Harrison Kim | Developer',
  description: "Harrison Kim's personal website and portfolio",
  keywords: ['developer', 'portfolio', 'react', 'nextjs', 'frontend'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="bg-black min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow flex justify-center">
            <div className="w-full max-w-7xl px-4 sm:px-6 py-16">
              {children}
            </div>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" theme="dark" />
        </Providers>
      </body>
    </html>
  );
} 