'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Issues', path: '/archive' },
    { name: 'About us', path: '/about' },
    { name: 'Contact us', path: '/contact' },
    { name: 'Editorial Board', path: '/editorial' },
    { name: 'Guidelines', path: '/guidelines' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-500 pt-6">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-6 md:px-10 py-3.5 max-w-7xl w-full rounded-full border border-slate-200/50 ${
            scrolled ? 'scale-[0.98] py-2.5 opacity-98' : 'scale-100 py-3.5 opacity-100'
          }`}
        >
          <Link href="/" className="flex items-center space-x-3 group outline-none ring-0">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="relative flex items-center justify-center p-0"
            >
              <Image 
                src="/assets/mset-logo-png-removebg-preview.png" 
                alt="MSET Logo" 
                width={64} 
                height={64} 
                className="w-16 h-16 object-contain"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl leading-none tracking-tighter text-slate-900 group-hover:text-emerald-700 transition-colors font-serif">BIOSPECTRA</span>
              <span className="text-[10px] font-bold text-emerald-600 tracking-[0.2em] uppercase opacity-80">ISSN: 0973-7057</span>
            </div>
          </Link>

          {/* Desktop Nav - Centered & Compact */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className={`flex items-center transition-all duration-300 rounded-full p-1 shadow-sm ${scrolled ? 'bg-white/40 ring-1 ring-white/20' : 'bg-slate-100/30'}`}>
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="relative px-4 xl:px-5 py-2 text-[12px] xl:text-[13px] whitespace-nowrap font-semibold transition-all duration-300 outline-none ring-0 focus:outline-none"
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white rounded-full shadow-md shadow-slate-200/50"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-900 font-medium'}`}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <Link href="/submit">
              <Button 
                variant="primary" 
                size="md" 
                className="rounded-full px-7 py-2.5 bg-emerald-700 hover:bg-emerald-800 shadow-lg shadow-emerald-900/10 active:scale-95 transition-all font-bold text-sm tracking-wide"
              >
                Submit Article
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden fixed inset-x-4 top-[84px] z-50 bg-white/98 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden p-6"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold p-4 rounded-2xl transition-all ${
                    pathname === link.path 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link href="/submit" onClick={() => setIsOpen(false)}>
                  <Button className="w-full py-4 rounded-2xl text-lg font-bold">Submit Article</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
