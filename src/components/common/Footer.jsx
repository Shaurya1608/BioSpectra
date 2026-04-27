'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, 
  Linkedin, Github, FileText, ChevronRight, 
  ArrowUp, ExternalLink 
} from 'lucide-react';

const P = {
  deepPurple:   '#2d0057',
  richPurple:   '#5a0096',
  magenta:      '#be00be',
  white:        '#ffffff',
  borderSoft:   'rgba(255,255,255,0.12)',
};

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05000a] pt-20 pb-10 overflow-hidden border-t border-white/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.15] blur-[120px]" style={{ background: P.magenta }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.15] blur-[100px]" style={{ background: P.richPurple }} />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-4 group w-fit">
                <div 
                  style={{ background: `linear-gradient(135deg, ${P.richPurple}, ${P.magenta})` }}
                  className="p-3.5 rounded-2xl shadow-xl shadow-magenta/20 transition-transform group-hover:scale-110 duration-500"
                >
                  <FileText className="text-white w-6 h-6" />
                </div>
                <h2 
                  style={{ fontFamily: 'var(--font-crimson-pro), serif', color: '#ffffff' }}
                  className="font-black text-4xl tracking-tight"
                >
                  BIOSPECTRA
                </h2>
              </Link>
              <p className="text-white opacity-80 text-[15px] leading-relaxed max-w-sm font-medium">
                An International Biannual Refereed Journal of Life Sciences. Dedicated to the advancement of biological research and scientific excellence since 2006.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Github, href: '#' }
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white/60 hover:text-white hover:bg-magenta hover:border-magenta hover:shadow-lg hover:shadow-magenta/20 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]" style={{ color: '#ffffff' }}>Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Archive', path: '/archive' },
                { name: 'Editorial Board', path: '/editorial' },
                { name: 'Author Guidelines', path: '/guidelines' },
                { name: 'Gallery', path: '/gallery' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-white/70 hover:text-white text-sm font-bold transition-all flex items-center group"
                  >
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-magenta mr-2" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Focus */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]" style={{ color: '#ffffff' }}>Research Focus</h3>
            <ul className="space-y-4">
              {[
                'Molecular Biology', 'Environmental Science', 'Biotechnology',
                'Genetics & Genomics', 'Animal Sciences'
              ].map((cat) => (
                <li key={cat}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white text-sm font-bold transition-all flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-magenta/40 group-hover:bg-magenta transition-colors mr-3" />
                    <span>{cat}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]" style={{ color: '#ffffff' }}>Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin size={16} className="text-magenta" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Address</span>
                  <p className="text-white font-semibold text-[14px] leading-relaxed">
                    Madhawi Shyam Educational Trust, Ranchi, Jharkhand, India.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-magenta" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Email</span>
                  <a href="mailto:biospectra@yahoo.com" className="text-white hover:text-magenta text-[14px] font-black transition-colors">
                    biospectra@yahoo.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center space-x-4">
              <span className="px-2.5 py-1 bg-magenta/15 border border-magenta/30 text-magenta text-[10px] font-black uppercase tracking-widest rounded-md">ISSN: 0973-7057</span>
              <span className="px-2.5 py-1 bg-white/10 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest rounded-md">Reg No. 20560/IV-1815/2005</span>
            </div>
            <p className="text-white/60 text-[12px] font-semibold tracking-wide text-center md:text-left">
              &copy; {mounted ? new Date().getFullYear() : '2024'} Biospectra Journal. Official Publication of MSET.
            </p>
          </div>
          
          <div className="flex items-center space-x-8">
             <div className="flex items-center space-x-8">
                <Link href="/privacy" className="text-white/60 hover:text-white text-[12px] font-bold uppercase tracking-widest transition-colors">Privacy</Link>
                <Link href="/terms" className="text-white/60 hover:text-white text-[12px] font-bold uppercase tracking-widest transition-colors">Terms</Link>
             </div>
             
             <button 
               onClick={scrollToTop}
               className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-magenta hover:border-magenta hover:scale-110 transition-all duration-300"
               aria-label="Back to top"
             >
               <ArrowUp size={22} />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
