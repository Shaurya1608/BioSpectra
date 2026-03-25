'use client';
import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, centered = false, compact = false, dark = false }) => {
  return (
    <div className={`${compact ? 'mb-4' : 'mb-8'} ${centered ? 'text-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className={`${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-black ${dark ? 'text-white' : 'text-slate-900'} mb-2 font-serif`}>
          {title}
          <div className={`${compact ? 'mt-1 w-10 h-1' : 'mt-2 w-16 h-1'} bg-emerald-600 rounded-full`}></div>
        </h2>
        {subtitle && (
          <p className={`${compact ? 'text-xs' : 'text-sm'} ${dark ? 'text-slate-400' : 'text-slate-500'} mt-2 max-w-2xl ${centered ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SectionTitle;
