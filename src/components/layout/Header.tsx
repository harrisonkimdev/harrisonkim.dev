'use client';

import { useReducer, useEffect, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

// 상태 타입
type HeaderState = {
  isMenuOpen: boolean;
  isScrolled: boolean;
};

// 액션 타입
type HeaderAction =
  | { type: 'TOGGLE_MENU' }
  | { type: 'CLOSE_MENU' }
  | { type: 'SET_SCROLLED', payload: boolean };

// 리듀서 함수
const headerReducer = (state: HeaderState, action: HeaderAction): HeaderState => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'CLOSE_MENU':
      return { ...state, isMenuOpen: false };
    case 'SET_SCROLLED':
      return { ...state, isScrolled: action.payload };
    default:
      return state;
  }
};

// 로고 컴포넌트
const Logo = memo(() => (
  <Link href="/" className="flex items-center gap-2 text-xl font-mono">
    <span className="text-primary font-bold">{'>'}</span>
    <span className="text-white font-light">harrisonkim.dev</span>
    <span className="blink-cursor text-primary">_</span>
  </Link>
));
Logo.displayName = 'Logo';

// 데스크톱 네비게이션 컴포넌트
const DesktopNav = memo(() => (
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
));
DesktopNav.displayName = 'DesktopNav';

// 모바일 메뉴 버튼 컴포넌트
const MenuButton = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button 
    className="md:hidden text-gray-300 hover:text-primary"
    onClick={onClick}
    aria-label="Toggle menu"
  >
    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
  </button>
));
MenuButton.displayName = 'MenuButton';

// 모바일 네비게이션 컴포넌트
const MobileNav = memo(() => (
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
));
MobileNav.displayName = 'MobileNav';

const Header = () => {
  // 초기 상태
  const initialState: HeaderState = {
    isMenuOpen: false,
    isScrolled: false
  };

  const [state, dispatch] = useReducer(headerReducer, initialState);
  const { isMenuOpen, isScrolled } = state;
  const pathname = usePathname();

  const toggleMenu = () => dispatch({ type: 'TOGGLE_MENU' });

  // 스크롤 감지 이펙트
  useEffect(() => {
    const handleScroll = () => {
      dispatch({ type: 'SET_SCROLLED', payload: window.scrollY > 50 });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 경로 변경 시 메뉴 닫기
  useEffect(() => {
    dispatch({ type: 'CLOSE_MENU' });
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Logo />
        <DesktopNav />
        <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <MobileNav />}
    </header>
  );
};

export default Header; 