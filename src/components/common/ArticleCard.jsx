'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, FileText, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ArticleCard = ({ article }) => {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100/50 overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group flex flex-col h-full w-full p-7 cursor-pointer outline-none relative"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">
            {article.category}
          </span>
        </div>
        <div className="flex items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          <Calendar size={10} className="mr-1 text-emerald-500/50" />
          {mounted ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '...'}
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-black text-slate-900 mb-3 line-clamp-2 leading-[1.3] group-hover:text-emerald-700 transition-colors font-serif tracking-tight">
        {article.title}
      </h3>

      <div className="flex items-center mb-4 text-slate-500">
        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mr-2">
          <User size={10} className="text-emerald-600" />
        </div>
        <span className="text-[10px] font-bold truncate tracking-tight">{article.authors.join(', ')}</span>
      </div>

      <p className="text-[12px] text-slate-600 mb-6 line-clamp-3 leading-relaxed font-medium">
        {article.abstract}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
          Vol. {article.volume} • No. {article.issue}
        </div>
        <div className="flex items-center text-[10px] font-black uppercase tracking-[0.1em] text-emerald-600 group-hover:text-emerald-700 transition-colors">
          Read Full
          <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;

