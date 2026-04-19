'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Search, Calendar } from 'lucide-react';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import galleryData from '@/data/galleryData.js';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [query, setQuery] = useState('');

  const P = {
    deepPurple: '#2d0057',
    richPurple: '#5a0096',
    magenta:    '#be00be',
    textBody:   '#3d2a5a',
    textMuted:  '#7c5da0',
    lavenderMist: '#f5eeff',
    border:     'rgba(139,0,204,0.1)',
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return galleryData;
    return galleryData.filter(item =>
      item.caption.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.date && item.date.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div 
      className="pt-40 pb-20 min-h-screen"
      style={{ background: '#fdfcff' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div style={{ width: 40, height: 2, background: P.magenta, marginBottom: 20 }} />
            <h1 
              style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
              className="text-3xl md:text-5xl font-black mb-4 tracking-tight uppercase"
            >
              Scientific Gallery
            </h1>
            <p style={{ color: P.textBody }} className="text-sm leading-relaxed opacity-80">
              A visual collection of research discoveries, award ceremonies, and life science observations from our contributors.
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16 relative group">
          <Search size={18} style={{ color: P.textMuted }} className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-magenta" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title, category or date…"
            style={{ border: `1px solid ${P.border}` }}
            className="w-full pl-14 pr-6 py-4 bg-white text-sm text-slate-800 placeholder-slate-300 shadow-xl shadow-purple-900/5 focus:outline-none focus:border-magenta focus:ring-4 focus:ring-magenta/5 transition-all"
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: P.textMuted }} className="absolute right-5 top-1/2 -translate-y-1/2 hover:text-magenta transition-colors">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Results Count */}
        {query && (
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-10" style={{ color: P.textMuted }}>
            Found <span style={{ color: P.magenta }}>{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.length === 0 ? (
            <div style={{ color: P.textMuted }} className="col-span-full text-center py-20 text-sm font-medium border-2 border-dashed border-purple-100 italic">No discoveries match your search.</div>
          ) : filtered.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`img-${item.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedImg(item)}
              style={{ border: `1px solid ${P.border}` }}
              className="group relative h-64 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-slate-50"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Hover Overlay */}
              <div 
                style={{ background: 'linear-gradient(to top, rgba(45,0,87,0.9), transparent)' }}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5"
              >
                <div style={{ background: P.magenta }} className="w-6 h-0.5 mb-3" />
                <span style={{ color: P.magenta }} className="text-[9px] font-black uppercase tracking-[0.2em] mb-1">{item.category}</span>
                <p className="text-white font-bold text-xs line-clamp-2 leading-relaxed">{item.caption}</p>
              </div>
              
              {/* Expand Icon */}
              <div 
                style={{ background: 'rgba(255,255,255,0.2)' }}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center text-white"
              >
                <Maximize2 size={14} />
              </div>

              {/* Date Tag */}
              {item.date && (
                <div 
                  style={{ background: 'rgba(45,0,87,0.85)' }}
                  className="absolute bottom-4 right-4 text-white text-[9px] font-black px-2.5 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {item.date}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 md:p-12"
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-magenta transition-colors hover:rotate-90 duration-300"
            >
              <X size={32} />
            </button>
            <motion.div
              layoutId={`img-${selectedImg.id}`}
              style={{ border: `1px solid rgba(255,255,255,0.1)` }}
              className="relative max-w-5xl w-full bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] md:aspect-video w-full">
                <Image
                  src={selectedImg.image}
                  alt={selectedImg.caption}
                  fill
                  className="object-contain bg-black"
                />
              </div>
              <div className="p-10 bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <span style={{ color: P.magenta }} className="text-[10px] font-black uppercase tracking-[0.3em]">{selectedImg.category}</span>
                  <div className="flex-grow h-[1px]" style={{ background: P.border }} />
                  {selectedImg.date && (
                    <span style={{ color: P.textMuted }} className="flex items-center text-[10px] font-bold uppercase">
                      <Calendar size={12} className="mr-2" /> {selectedImg.date}
                    </span>
                  )}
                </div>
                <h3 
                  style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  {selectedImg.caption}
                </h3>
                <p style={{ color: P.textBody }} className="text-sm leading-relaxed opacity-80 max-w-3xl">
                  Part of the Biospectra research documentation system. This visual data has been contributed by lead researchers and authors associated with the Madhawi Shyam Educational Trust.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
