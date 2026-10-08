import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 md:py-28 relative" aria-label="Education History">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-blue-400 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Education
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>

          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Academic background from secondary education to undergraduate studies in Computer Science &amp; Engineering.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10 max-w-4xl">
          {portfolioData.education.map((item, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Marker Dot */}
              <div 
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-4 ${
                  item.current
                    ? 'border-blue-500 bg-blue-950 text-blue-400 shadow-md shadow-blue-500/30'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
                } flex items-center justify-center`}
              >
                <div className={`w-2 h-2 rounded-full ${item.current ? 'bg-blue-400 animate-pulse' : 'bg-slate-500'}`} />
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 hover:border-slate-700 hover:shadow-xl transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {item.institution}
                      </h3>
                      {item.current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-base font-medium text-slate-300 mt-1">
                      {item.degree}
                    </div>
                  </div>

                  {/* Score Badge */}
                  <div className="sm:text-right shrink-0">
                    <div className="inline-flex sm:flex-col items-center sm:items-end gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-300">
                      <span className="text-[11px] font-mono text-slate-400">{item.scoreLabel}:</span>
                      <span className="text-sm sm:text-base font-bold text-blue-400 font-mono">{item.score}</span>
                    </div>
                  </div>
                </div>

                {/* Period & Location Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.period}</span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                    {item.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400/80 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
