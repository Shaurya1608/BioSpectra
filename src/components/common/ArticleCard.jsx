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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: P.lavenderMist,
        border: `1px solid ${P.border}`,
        padding: 'clamp(28px, 5vw, 40px) clamp(20px, 4vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '2px', // Slight rounding for premium feel
      }}
      className="group hover:bg-white transition-all duration-500 hover:shadow-xl hover:shadow-purple-900/5"
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
          transition: 'transform 0.5s ease',
        }}
        className="group-hover:scale-x-100"
      />

      {/* Category + Date row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{ width: 6, height: 6, background: P.vivid, borderRadius: '50%', transition: 'background 0.3s' }}
            className="group-hover:bg-[#be00be]"
          />
          <span style={{ fontSize: 'clamp(8.5px, 1.2vw, 9.5px)', fontWeight: 800, color: P.richPurple, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            {article.category}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 'clamp(9px, 1.2vw, 10px)', color: P.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          <Calendar size={11} style={{ marginRight: 6, color: P.vivid, opacity: 0.65 }} />
          {mounted
            ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
            : '...'}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-crimson-pro), serif',
          fontSize: 'clamp(19px, 2.5vw, 24px)',
          fontWeight: 800,
          color: P.deepPurple,
          lineHeight: 1.2,
          letterSpacing: '0.01em',
          marginBottom: 16,
        }}
        className="line-clamp-2 group-hover:text-[#be00be] transition-colors duration-300"
      >
        {article.title}
      </h3>

      {/* Authors */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, color: P.textBody }}>
        <div
          style={{
            padding: 5,
            border: `1px solid ${P.border}`,
            background: P.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            borderRadius: '2px',
          }}
        >
          <User size={12} color={P.richPurple} />
        </div>
        <span style={{ fontSize: 'clamp(10.5px, 1.4vw, 11px)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: P.textBody, opacity: 0.85 }}>
          {article.authors.join(', ')}
        </span>
      </div>

      {/* Abstract */}
      <p
        style={{ fontSize: 'clamp(12px, 1.5vw, 13px)', color: P.textBody, lineHeight: 1.75, marginBottom: 32, flex: 1 }}
        className="line-clamp-3 opacity-80"
      >
        {article.abstract}
      </p>

      {/* Footer — vol/issue + Read Full */}
      <div
        style={{
          paddingTop: 20,
          borderTop: `1px solid ${P.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        <div style={{ fontSize: 9, fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.18em', color: P.textMuted }}>
          Vol. {article.volume} • No. {article.issue}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 10.5,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: P.richPurple,
            transition: 'color 0.3s',
          }}
          className="group-hover:text-[#be00be]"
        >
          Read Full
          <ArrowRight
            size={14}
            style={{ marginLeft: 8, transition: 'transform 0.3s ease' }}
            className="group-hover:translate-x-1"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
