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
    { name: 'Submit', path: '/submit' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-500 pt-6">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`mx-auto flex items-center justify-between transition-all duration-700 ease-in-out bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-6 md:pl-10 md:pr-8 py-3.5 max-w-[1600px] w-full rounded-full border border-white/20 ${
            scrolled ? 'scale-[0.98] py-2.5 bg-white/80 shadow-lg' : 'scale-100 py-3.5'
          }`}
        >
          <Link href="/" className="flex items-center space-x-3 group outline-none ring-0 shrink-0 pr-4">
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
            <div className="flex flex-col max-w-[180px] md:max-w-[240px] lg:max-w-none">
              <span className="font-extrabold text-sm md:text-base lg:text-lg leading-tight tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors font-serif uppercase text-nowrap">
                Madhawi Shyam Educational Trust
              </span>
              <div className="flex flex-col mt-0.5">
                <span className="text-[8px] md:text-[9px] font-black text-slate-500 tracking-wider uppercase leading-tight">
                  & International Consortium of Contemporary Biologists (ICCB)
                </span>
                <span className="text-[8px] md:text-[9px] font-bold text-emerald-500 tracking-widest uppercase opacity-90 mt-0.5">
                  Reg. No. 20560/IV-1815/2005
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav - Clean Spaced Links */}
          <div className="hidden lg:flex items-center flex-1 justify-end pl-24 pr-4">
            <div className={`flex items-center transition-all duration-300 rounded-full p-1 shadow-sm ${scrolled ? 'bg-white/40 ring-1 ring-white/20' : 'bg-slate-100/30'}`}>
              {navLinks.map((link) => {
                const isActive = pathname === link.path;

                // Special styling for the Submit button to make it distinct but not too big
                if (link.name === 'Submit') {
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`ml-1 group relative px-5 xl:px-6 py-2 text-[12px] xl:text-[13px] whitespace-nowrap font-bold transition-all duration-300 outline-none ring-0 focus:outline-none rounded-2xl ${isActive ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 hover:shadow-sm'}`}
                    >
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="group relative px-3 xl:px-4 py-2 text-[12px] xl:text-[13px] whitespace-nowrap font-semibold transition-all duration-300 outline-none ring-0 focus:outline-none rounded-full"
                  >
                    {/* Hover Background Animation */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-emerald-50/50 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out z-0"></div>
                    )}
                    
                    {/* Active Background Animation */}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white rounded-full shadow-md shadow-slate-200/50 z-0"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}

                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-emerald-600' : 'text-slate-600 group-hover:text-emerald-600 font-medium'}`}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
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
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
