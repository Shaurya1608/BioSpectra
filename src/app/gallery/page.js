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
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Scientific Gallery" 
          subtitle="A visual collection of research discoveries, award ceremonies, and life science observations from our contributors."
          centered
        />

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-10 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title, category or date…"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Results Count */}
        {query && (
          <p className="text-center text-sm text-slate-500 mb-6">
            Showing <span className="font-semibold text-emerald-700">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-20 text-slate-400 text-sm">No images match your search.</div>
          ) : filtered.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`img-${item.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedImg(item)}
              className="group relative h-56 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow bg-slate-200"
            >
              <Image
                src={item.image.startsWith('/') ? item.image : `/assets/${item.image.split('/').pop()}`}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1">{item.category}</span>
                <p className="text-white font-semibold text-xs line-clamp-2 leading-snug">{item.caption}</p>
              </div>
              {/* Always-visible date badge */}
              {item.date && (
                <div className="absolute top-2 left-2 flex items-center bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  <Calendar size={9} className="mr-1 opacity-80" />
                  {item.date}
                </div>
              )}
              {/* Expand Icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center text-white">
                <Maximize2 size={13} />
              </div>
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
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-10"
          >
            <button className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors">
              <X size={28} />
            </button>
            <motion.div
              layoutId={`img-${selectedImg.id}`}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg.image.startsWith('/') ? selectedImg.image : `/assets/${selectedImg.image.split('/').pop()}`}
                alt={selectedImg.caption}
                width={800}
                height={600}
                className="w-full h-auto max-h-[65vh] object-contain bg-slate-100"
              />
              <div className="p-6 bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-emerald-700 text-[11px] font-bold uppercase tracking-widest">{selectedImg.category}</span>
                  {selectedImg.date && (
                    <span className="flex items-center text-slate-400 text-[11px]">
                      <Calendar size={11} className="mr-1" /> {selectedImg.date}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1.5 font-serif">{selectedImg.caption}</h3>
                <p className="text-slate-500 text-sm">Part of the Biospectra research documentation system. Contributed by the respective researchers and authors.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
