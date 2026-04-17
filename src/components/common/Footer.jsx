'use client';
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, FileText } from 'lucide-react';

const P = {
  deepPurple: '#2d0057',
  richPurple: '#5a0096',
  magenta:    '#be00be',
  textBody:   '#3d2a5a',
  textMuted:  '#7c5da0',
  border:     'rgba(139,0,204,0.1)',
};

const Footer = () => {
  return (
    <footer 
      style={{ background: `linear-gradient(135deg, ${P.deepPurple} 0%, #1a0038 100%)`, color: 'rgba(255,255,255,0.7)' }}
      className="pt-20 pb-10"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div 
                style={{ background: `linear-gradient(135deg, ${P.richPurple}, ${P.magenta})` }}
                className="p-2.5 rounded-lg"
              >
                <FileText className="text-white w-6 h-6" />
              </div>
              <span 
                style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
                className="text-white font-black text-2xl tracking-tight"
              >
                BIOSPECTRA
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              An International Biannual Refereed Journal of Life Sciences (ISSN: 0973-7057). Published by Madhawi Shyam Educational Trust, Ranchi.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="transition-all duration-300 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
              className="text-white font-bold text-lg mb-7 tracking-wide uppercase"
            >
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'Journal Archive', path: '/archive' },
                { name: 'About Us', path: '/about' },
                { name: 'Guidelines for Authors', path: '/submit' },
                { name: 'Scientific Gallery', path: '/gallery' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="hover:text-white transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Categories */}
          <div>
            <h3 
              style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
              className="text-white font-bold text-lg mb-7 tracking-wide uppercase"
            >
              Categories
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                'Review Articles', 'Invited Articles', 'Full-Length Papers',
                'Research Communications', 'Research News'
              ].map((cat) => (
                <li key={cat}>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
              className="text-white font-bold text-lg mb-7 tracking-wide uppercase"
            >
              Contact Us
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start space-x-4">
                <MapPin size={18} style={{ color: P.magenta }} className="mt-1 shrink-0" />
                <span className="leading-relaxed">Madhawi Shyam Educational Trust, Ranchi, Jharkhand, India.</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone size={18} style={{ color: P.magenta }} className="shrink-0" />
                <span className="font-semibold">+91 94313 89253</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={18} style={{ color: P.magenta }} className="shrink-0" />
                <span className="font-semibold">biospectra@yahoo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div 
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          className="pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs uppercase tracking-[0.15em]"
        >
          <p className="opacity-60 text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Biospectra Journal. All Rights Reserved. Reg. No. 20560/IV-1815/2005
          </p>
          <p className="font-bold text-white opacity-80">
            Design & Development by Madhawi Shyam Educational Trust
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
