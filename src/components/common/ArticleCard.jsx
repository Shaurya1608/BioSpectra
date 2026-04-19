'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Purple palette
const P = {
  deepPurple:   '#2d0057',
  richPurple:   '#5a0096',
  vivid:        '#8b00cc',
  magenta:      '#be00be',
  white:        '#ffffff',
  lavenderMist: '#f5eeff',
  lavenderSoft: '#ede0ff',
  border:       'rgba(139,0,204,0.1)',
  textBody:     '#3d2a5a',
  textMuted:    '#7c5da0',
};

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
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: 'rgba(255, 255, 255, 0.96)',
        border: `1px solid rgba(139,0,204,0.12)`,
        padding: 'clamp(28px, 4vw, 36px) clamp(20px, 4vw, 30px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '12px',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
      }}
      className="group transition-all duration-500 hover:shadow-2xl hover:shadow-magenta/10 hover:-translate-y-2"
    >
      {/* Top Accent Line — purple→magenta gradient slides in on hover */}
      <div
        style={{
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          height: 3,
          background: `linear-gradient(90deg, ${P.deepPurple}, ${P.magenta})`,
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRadius: '12px 12px 0 0',
        }}
        className="group-hover:scale-x-100"
      />

      {/* Category + Badges row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
          {/* Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div
              style={{ width: 5, height: 5, background: P.vivid, borderRadius: '50%' }}
              className="group-hover:bg-magenta transition-colors"
            />
            <span style={{ fontSize: '9px', fontWeight: 800, color: P.richPurple, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              {article.category}
            </span>
          </div>
          
          {/* Scientific Status Badges */}
          <div className="flex gap-2 w-full">
            <span style={{ fontSize: '7.5px', fontWeight: 800, color: '#be00be', background: 'rgba(190,0,190,0.08)', padding: '3px 8px', borderRadius: 4, letterSpacing: '0.08em', border: '1px solid rgba(190,0,190,0.15)' }}>
              PEER REVIEWED
            </span>
            <span style={{ fontSize: '7.5px', fontWeight: 800, color: P.richPurple, background: 'rgba(90,0,150,0.06)', padding: '3px 8px', borderRadius: 4, letterSpacing: '0.08em', border: '1px solid rgba(90,0,150,0.1)' }}>
              OPEN ACCESS
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px', color: P.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
          <Calendar size={11} style={{ marginRight: 6, color: P.vivid, opacity: 0.8 }} />
          {mounted
            ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
            : '...'}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-crimson-pro), serif',
          fontSize: 'clamp(20px, 2.5vw, 22px)',
          fontWeight: 800,
          color: P.deepPurple,
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          marginBottom: 14,
        }}
        className="line-clamp-2 group-hover:text-magenta transition-colors duration-400"
      >
        {article.title}
      </h3>

      {/* Authors */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div
          style={{
            padding: 6,
            background: 'rgba(139,0,204,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            borderRadius: '50%',
          }}
        >
          <User size={12} color={P.richPurple} />
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: P.textBody, opacity: 0.9 }}>
          {article.authors.length > 2 
            ? `${article.authors[0]}, ${article.authors[1]} et al.` 
            : article.authors.join(', ')}
        </span>
      </div>

      {/* Abstract */}
      <p
        style={{ fontSize: '13px', color: P.textBody, lineHeight: 1.8, marginBottom: 32, flex: 1 }}
        className="line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity"
      >
        {article.abstract}
      </p>

      {/* Footer — vol/issue + Read Full */}
      <div
        style={{
          paddingTop: 20,
          borderTop: `1px solid rgba(139,0,204,0.1)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        <div style={{ fontSize: 9, fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.15em', color: P.textMuted }}>
          Vol. {article.volume} • No. {article.issue}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: P.richPurple,
            transition: 'color 0.3s',
          }}
          className="group-hover:text-magenta"
        >
          Read Full
          <ArrowRight
            size={14}
            style={{ marginLeft: 8, transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
            className="group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
