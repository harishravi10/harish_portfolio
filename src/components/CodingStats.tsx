import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  BrainCircuit, 
  ExternalLink, 
  CheckCircle2, 
  Flame, 
  Code2 
} from 'lucide-react';

export const CodingStats: React.FC = () => {
  const { codingProfiles } = portfolioData;

  return (
    <section id="coding" className="py-20 md:py-28 relative" aria-label="Coding and Problem Solving">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-amber-400 uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              <span>Analytical Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Coding &amp; Problem Solving
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
          </div>

          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Consistent algorithmic practice to build strong foundations in time and space complexity, data structures, and edge-case handling.
          </p>
        </div>

        {/* Narrative Banner */}
        <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#121727]/90 via-[#0e1424]/90 to-[#0b101c]/90 border border-slate-800/80 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Continuous DSA Practice</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                "{codingProfiles.summary}"
              </p>
            </div>
          </div>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {codingProfiles.platforms.map((platform, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 hover:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-base text-amber-400">
                      {platform.name === 'LeetCode' ? 'LC' : 'GFG'}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{platform.name}</h4>
                      <p className="text-xs font-mono text-slate-400">{platform.focus}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {platform.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  {platform.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Profile Verified
                </span>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 transition-all hover:scale-[1.02]"
                >
                  <span>Visit Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Core DSA Topics Covered (Truthful & Relevant) */}
        <div className="p-6 rounded-2xl bg-[#090d18]/80 border border-slate-800/70">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>Core Data Structures &amp; Algorithmic Concepts Practiced</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-300">
            {codingProfiles.dsaTopics.map((topic, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-medium text-slate-200">{topic}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
