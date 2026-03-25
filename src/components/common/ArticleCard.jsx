'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, FileText, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ArticleCard = ({ article }) => {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleTap = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <motion.div
      onTap={handleTap}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group flex flex-col h-full w-[300px] shrink-0 p-5 cursor-pointer outline-none"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-emerald-100">
          {article.category}
        </span>
        <div className="flex flex-col items-end text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          <span className="flex items-center mb-1">
            <Calendar size={10} className="mr-1" />
            {mounted ? new Date(article.date).toLocaleDateString() : 'Loading...'}
          </span>
          <span className="flex items-center">
            <FileText size={10} className="mr-1" />
            V{article.volume} I{article.issue}
          </span>
        </div>
      </div>

      <h3 className="text-[15px] font-black text-slate-900 mb-3 line-clamp-3 leading-snug group-hover:text-emerald-700 transition-colors font-serif tracking-tight">
        {article.title}
      </h3>

      <div className="text-[11px] font-bold text-slate-500 mb-3 flex items-center">
        <Users size={12} className="mr-1.5 shrink-0" />
        <span className="line-clamp-1">{article.authors.join(', ')}</span>
      </div>

      <p className="text-[12px] text-slate-600 mb-5 line-clamp-2 leading-relaxed border-l-2 border-emerald-100 pl-3 italic">
        {article.abstract}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-100/50">
        <div className="w-full group/btn flex items-center justify-between text-[11px] font-black uppercase tracking-widest bg-slate-50 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-800 transition-colors py-2.5 px-4 rounded-lg">
          Read Article
          <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:text-emerald-600 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
