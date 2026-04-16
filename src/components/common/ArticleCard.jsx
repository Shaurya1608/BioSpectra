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
      style={{
        background: '#f7f5ef',
        border: '1px solid rgba(26,46,26,0.08)',
        padding: '36px 30px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative'
      }}
      className="group hover:bg-white transition-colors duration-500"
    >
      {/* Top Accent Line */}
      <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 3, background: '#1a2e1a', transformOrigin: 'left', transform: 'scaleX(0)', transition: 'transform 0.5s ease' }} className="group-hover:scale-x-100" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, background: '#1a2e1a', borderRadius: '50%' }} className="group-hover:bg-[#1a7a3a] transition-colors" />
          <span style={{ fontSize: 9, fontWeight: 800, color: '#1a2e1a', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            {article.category}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 9.5, color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          <Calendar size={11} style={{ marginRight: 6, color: '#1a2e1a', opacity: 0.5 }} />
          {mounted ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '...'}
        </div>
      </div>

      <h3 
        style={{ 
          fontFamily: 'var(--font-crimson-pro), serif', 
          fontSize: 22, 
          fontWeight: 800, 
          color: '#0d1a0d', 
          lineHeight: 1.25, 
          letterSpacing: '0.01em',
          marginBottom: 16
        }}
        className="line-clamp-2 group-hover:text-[#1a7a3a] transition-colors duration-300"
      >
        {article.title}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, color: '#4a5568' }}>
        <div style={{ padding: 4, border: '1px solid rgba(26,46,26,0.1)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
          <User size={12} color="#1a2e1a" />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {article.authors.join(', ')}
        </span>
      </div>

      <p style={{ fontSize: 13, color: '#4a5568', lineHeight: 1.7, marginBottom: 32, flex: 1 }} className="line-clamp-3">
        {article.abstract}
      </p>

      <div style={{ paddingTop: 20, borderTop: '1px solid rgba(26,46,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }} className="group-hover:border-[#1a2e1a]/20 transition-colors duration-300">
        <div style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#6b7280' }}>
          Vol. {article.volume} • No. {article.issue}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#1a2e1a' }} className="group-hover:text-[#1a7a3a] transition-colors">
          Read Full
          <ArrowRight size={14} style={{ marginLeft: 8, transition: 'transform 0.3s ease' }} className="group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;

