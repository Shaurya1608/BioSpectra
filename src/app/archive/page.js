'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ChevronRight, FileText, Search, Library, Filter, Calendar, Layers } from 'lucide-react';
import Link from 'next/link';

const Archive = () => {
  const [activeYear, setActiveYear] = useState(2024);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearQuery, setYearQuery] = useState('');

  const P = {
    deepGreen:  '#064e3b',
    emerald:    '#059669',
    richPurple: '#6d28d9',
    violet:     '#7c3aed',
    mint:       '#f0fdf4',
    textBody:   '#1e293b',
    textMuted:  '#64748b',
    border:     'rgba(5, 150, 105, 0.1)',
    glass:      'rgba(255, 255, 255, 0.7)',
  };

  // Expanded Mock data from 2036 down to 2006 (31 years)
  const archives = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => {
      const year = 2036 - i;
      const volume = year - 2005; // 2006 represents Volume 1
      const count1 = 12 + (year % 5);
      const count2 = 14 + (year % 4);
      return {
        volume,
        year,
        issues: [
          { number: 2, month: 'September', articleCount: count2, type: 'Regular Issue' },
          { number: 1, month: 'March', articleCount: count1, type: 'Regular Issue' },
        ]
      };
    });
  }, []);

  const availableYears = archives.map(a => a.year);

  const filteredYears = useMemo(() => {
    if (!yearQuery) return availableYears;
    return availableYears.filter(year => year.toString().includes(yearQuery));
  }, [yearQuery, availableYears]);

  const activeVolume = useMemo(() => {
    return archives.find(a => a.year === activeYear) || archives[0];
  }, [activeYear, archives]);

  const filteredIssues = useMemo(() => {
    if (!searchQuery) return activeVolume.issues;
    const lowerQuery = searchQuery.toLowerCase();
    return activeVolume.issues.filter(issue => 
      issue.month.toLowerCase().includes(lowerQuery) || 
      issue.number.toString().includes(lowerQuery) ||
      (issue.type && issue.type.toLowerCase().includes(lowerQuery))
    );
  }, [searchQuery, activeVolume]);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#f8fafc' }}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px]" style={{ background: P.emerald }} />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full opacity-10 blur-[100px]" style={{ background: P.violet }} />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full opacity-5 blur-[110px]" style={{ background: P.deepGreen }} />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="w-full px-6 md:px-12 lg:px-24">
          
          {/* Page Header Section */}
          <header className="max-w-4xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center text-center"
            >
              <h1 
                className="text-lg md:text-2xl font-black mb-3 tracking-tight text-gradient bg-clip-text text-transparent w-full"
                style={{ 
                  fontFamily: 'var(--font-crimson-pro), serif',
                  backgroundImage: `linear-gradient(135deg, ${P.deepGreen}, ${P.richPurple})`
                }}
              >
                Journal Issues
              </h1>
              <p className="text-xs md:text-sm text-textBody max-w-lg mx-auto leading-relaxed opacity-70 font-medium">
                A legacy of scientific excellence. Browse our complete collection of peer-reviewed biological research, spanning over three decades of discovery.
              </p>
            </motion.div>
          </header>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/3 xl:w-1/4 shrink-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-20"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-white p-4 shadow-xl shadow-slate-900/5 rounded-2xl overflow-hidden relative group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-violet-600 opacity-30" />
                  
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <Calendar size={18} />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-emerald-900">Published Volumes</h3>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{availableYears.length} Years</span>
                  </div>

                  {/* Year Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={14} />
                    <input 
                      type="text" 
                      placeholder="Filter by year..."
                      value={yearQuery}
                      onChange={(e) => setYearQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-emerald-500/20 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 rounded-xl text-xs font-bold transition-all outline-none"
                    />
                  </div>
                  
                  {/* Years Scroll List */}
                  <div 
                    className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[350px] pr-2 pb-2 lg:pb-0 custom-scrollbar"
                    style={{ scrollbarWidth: 'thin' }}
                    data-lenis-prevent
                  >
                    {filteredYears.length > 0 ? (
                      filteredYears.map((year) => {
                        const vol = archives.find(a => a.year === year)?.volume;
                        const isActive = activeYear === year;
                        return (
                          <button
                            key={year}
                            onClick={() => { setActiveYear(year); setSearchQuery(''); }}
                            className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-left whitespace-nowrap
                              ${isActive 
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                                : 'hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                              }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className={`text-[10px] font-black tracking-tighter ${isActive ? 'text-white/80' : 'text-slate-400 group-hover:text-emerald-700/60'}`}>
                                VOL.{vol.toString().padStart(2, '0')}
                              </span>
                              <span className="text-xs font-black tracking-wider uppercase">{year}</span>
                            </div>
                            {isActive && (
                              <motion.div layoutId="active-indicator">
                                <ChevronRight size={14} className="opacity-80" />
                              </motion.div>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 opacity-40 italic text-xs font-bold">
                        No results found.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:w-2/3 xl:w-3/4 flex-grow">
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col md:flex-row gap-3 mb-6 items-stretch md:items-center"
              >
                {/* Search in Volume */}
                <div className="relative flex-grow group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <Search size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder={`Search in Vol. ${activeVolume.volume} (${activeVolume.year})...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-md border border-white shadow-md shadow-slate-900/5 rounded-xl focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-xs font-bold placeholder:text-slate-400 text-slate-700"
                  />
                </div>

                {/* Info Badge */}
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-md border border-white px-4 py-3 rounded-xl shadow-md shadow-slate-900/5">
                  <div className="p-1.5 rounded-lg bg-emerald-900 text-white">
                    <Layers size={14} />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1">Active Volume</h4>
                    <p className="text-xs font-black text-emerald-900 leading-none">Vol. {activeVolume.volume} ({activeVolume.year})</p>
                  </div>
                </div>
              </motion.div>

              {/* Volume Content */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeYear + searchQuery}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {filteredIssues.length > 0 ? (
                      filteredIssues.map((issue, idx) => (
                        <Link 
                          href={`/issue/${activeVolume.volume}/${issue.number}`}
                          key={issue.number}
                          className="group relative bg-white border border-slate-100 shadow-md shadow-slate-900/5 hover:shadow-xl hover:shadow-emerald-900/5 rounded-xl p-5 transition-all duration-300 overflow-hidden flex flex-col"
                        >
                          {/* Hover Background Pattern */}
                          <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                            <Book size={80} className="text-emerald-600 rotate-12" />
                          </div>

                          <div className="flex items-start justify-between mb-5 relative z-10">
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1.5">{issue.type}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-black group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                  {issue.number}
                                </div>
                                <h3 className="text-base md:text-lg font-black text-slate-900" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                                  {issue.month} Issue
                                </h3>
                              </div>
                            </div>
                            <div className="bg-slate-50 text-slate-400 p-1.5 rounded-md group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                              <Book size={14} />
                            </div>
                          </div>

                          <div className="mb-4 relative z-10">
                            <p className="text-slate-500 text-xs font-medium mb-3 leading-relaxed line-clamp-2">
                              This issue contains {issue.articleCount} peer-reviewed scientific papers covering various fields of biological research.
                            </p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1.5 text-slate-600 font-black text-[9px] uppercase tracking-widest">
                                <FileText size={10} className="text-emerald-500" />
                                <span>{issue.articleCount} Papers</span>
                              </div>
                              <div className="flex items-center space-x-1.5 text-slate-600 font-black text-[9px] uppercase tracking-widest">
                                <Calendar size={10} className="text-emerald-500" />
                                <span>{issue.month} {activeVolume.year}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 group-hover:text-emerald-700 transition-colors">Explore Issue</span>
                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all group-hover:translate-x-1">
                              <ChevronRight size={12} />
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full py-16 px-6 text-center bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-md shadow-slate-900/5">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Filter size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">No Matching Issues</h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">We couldn't find any issues matching "{searchQuery}" in this volume.</p>
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="mt-6 px-5 py-2 bg-emerald-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20"
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
      
      {/* Custom Styles for scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(5, 150, 105, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(5, 150, 105, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Archive;
