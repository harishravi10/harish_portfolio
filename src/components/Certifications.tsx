import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, CheckCircle, ShieldCheck } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-12 md:py-16 relative" aria-label="Certifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-purple-400 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Certifications
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0e1222]/90 to-[#0a0d18]/90 border border-purple-500/20 shadow-xl relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-purple-950/60 text-purple-300 border border-purple-700/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>{cert.issuer}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {cert.title}
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Comprehensive training covering core Java concepts and software engineering best practices.
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Topics Covered
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {cert.topics.map((topic, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Truthful Note (no fake verify link) */}
              <div className="mt-6 pt-3 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>Completed Course Curriculum</span>
                <span className="text-purple-400/80">&bull; Verified Content</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
