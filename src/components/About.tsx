import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  User, 
  BookOpen, 
  Cpu, 
  GraduationCap, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const About: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 md:py-28 relative" aria-label="About Me">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-blue-400 uppercase tracking-wider">
            <User className="w-4 h-4" />
            <span>Profile Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bio Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0e1424]/90 to-[#0a0e1a]/90 border border-slate-800/80 shadow-xl backdrop-blur-md">
              <p className="text-slate-200 text-lg sm:text-xl font-normal leading-relaxed">
                "{personal.aboutNarrative}"
              </p>

              <div className="mt-6 pt-6 border-t border-slate-800/80">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>Key Interests &amp; Focus Areas</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {personal.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:border-blue-400/40 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Snapshot Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#0c111f]/80 border border-slate-800/70 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 text-indigo-400 mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Academic Program</span>
                </div>
                <div className="text-base font-semibold text-white">B.E. Computer Science</div>
                <div className="text-xs text-slate-400 mt-1">SSN College of Engineering, Chennai</div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/60 text-xs text-slate-300 font-mono">
                  <span>CGPA:</span>
                  <span className="text-blue-400 font-bold">{personal.cgpa}</span>
                  <span className="text-slate-500">&bull;</span>
                  <span>Batch of 2028</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#0c111f]/80 border border-slate-800/70 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 text-purple-400 mb-2">
                  <Layers className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Engineering Approach</span>
                </div>
                <div className="text-base font-semibold text-white">Clean OOP &amp; Schemas</div>
                <div className="text-xs text-slate-400 mt-1">Focus on modular architecture, relational modeling, and algorithmic problem-solving.</div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-purple-400 font-mono">
                  <span>Student &amp; Aspiring Developer</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Currently Learning Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#10172c]/90 to-[#0b101e]/90 border border-indigo-500/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Currently Learning</h3>
                    <p className="text-xs text-slate-400">Active skill development &amp; coursework</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  In Progress
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                Expanding beyond core fundamentals into enterprise backend frameworks and modern application patterns:
              </p>

              <div className="space-y-3">
                {personal.currentlyLearning.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#090d18]/80 border border-slate-800/80 hover:border-indigo-500/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-mono font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                <span>Continuously building &amp; pushing code</span>
                <a 
                  href="#journey" 
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium"
                >
                  <span>See roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
