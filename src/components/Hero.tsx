import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { CodeCard } from './CodeCard';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Database
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex flex-col justify-center"
      aria-label="Introduction"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{personal.statusBadge}</span>
            </div>

            {/* Greetings & Titles */}
            <div className="space-y-2">
              <p className="text-slate-400 font-mono text-sm sm:text-base tracking-wide flex items-center gap-2">
                <span>Hello, I'm</span>
                <span className="inline-block w-8 h-[1px] bg-slate-700" />
              </p>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Harish <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">R</span>
              </h1>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300 pt-1">
                {personal.headline}
              </h2>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {personal.bio}
            </p>

            {/* Academic & Location Quick Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>{personal.shortCollege}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>Java &bull; MySQL &bull; DSA</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* Primary: View My Projects */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary: Contact Me */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Contact Me</span>
              </a>

              {/* Social Icon Buttons */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105 shadow-sm"
                  aria-label="Harish R on GitHub"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-blue-400 transition-all hover:scale-105 shadow-sm"
                  aria-label="Harish R on LinkedIn"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Stat Pill Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg">
              <div className="p-2.5 rounded-xl bg-[#0b0f1a]/60 border border-slate-800/60">
                <div className="text-xs text-slate-400 font-mono">Specialization</div>
                <div className="text-sm font-semibold text-white mt-0.5">Java Full Stack</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0b0f1a]/60 border border-slate-800/60">
                <div className="text-xs text-slate-400 font-mono">Institution</div>
                <div className="text-sm font-semibold text-white mt-0.5">SSN Chennai</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0b0f1a]/60 border border-slate-800/60">
                <div className="text-xs text-slate-400 font-mono">Graduation</div>
                <div className="text-sm font-semibold text-white mt-0.5">Batch 2028</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Code Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <CodeCard />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
