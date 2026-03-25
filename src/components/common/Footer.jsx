'use client';
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="bg-emerald-700 p-2 rounded-xl">
                <FileText className="text-white w-6 h-6" />
              </div>
              <span className="text-white font-extrabold text-2xl tracking-tighter font-serif">BIOSPECTRA</span>
            </div>
            <p className="text-sm leading-relaxed">
              An innovative, refereed, biannual research journal in the field of Life Sciences published by Madhawi-Shyam Educational Trust, Ranchi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-serif">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link></li>
              <li><Link href="/archive" className="hover:text-emerald-500 transition-colors">Journal Archive</Link></li>
              <li><Link href="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
              <li><Link href="/submit" className="hover:text-emerald-500 transition-colors">Guidelines for Authors</Link></li>
              <li><Link href="/gallery" className="hover:text-emerald-500 transition-colors">Scientific Gallery</Link></li>
            </ul>
          </div>

          {/* Article Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-serif">Categories</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Review Articles</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Invited Articles</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Full-Length Papers</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Research Communications</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Research News</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-serif">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>Madhawi-Shyam Educational Trust, Ranchi, Jharkhand, India.</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+91 94313 89253</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>biospectra@yahoo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} Biospectra Journal. All Rights Reserved. Reg. No. 20560/IV-1815/2005</p>
          <p className="mt-4 md:mt-0">Design & Development by Madhawi-Shyam Educational Trust</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
