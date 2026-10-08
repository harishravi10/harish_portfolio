import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  Mail
} from 'lucide-react';

interface CinemaHUDProps {
  scrollProgress: number;
}

export const CinemaHUD: React.FC<CinemaHUDProps> = ({ scrollProgress }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [recruiterDrawerOpen, setRecruiterDrawerOpen] = useState(false);

  // Web Audio Procedural Sci-Fi Synth Blip
  const playSciFiSound = (freq: number = 520, type: OscillatorType = 'sine') => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.6, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Audio not permitted without interaction
    }
  };

  // Determine Current Scene Act
  const getActInfo = (progress: number) => {
    if (progress < 0.12) return { act: '00', name: 'ORIGIN // HARISH R', target: '#home' };
    if (progress < 0.25) return { act: '01', name: 'WHO AM I? // PROFILE', target: '#about' };
    if (progress < 0.40) return { act: '02', name: 'TECH GALAXY // SKILLS', target: '#skills' };
    if (progress < 0.58) return { act: '03', name: 'BUILDING WORLD // PROJECTS', target: '#projects' };
    if (progress < 0.70) return { act: '04', name: 'TIME MACHINE // EDUCATION', target: '#education' };
    if (progress < 0.82) return { act: '05', name: 'THINK IN 3D // DSA & CODING', target: '#coding' };
    if (progress < 0.92) return { act: '06', name: 'CHROME VAULT // CREDENTIALS', target: '#certifications' };
    return { act: '07', name: 'CONVERGENCE // LET\'S BUILD', target: '#contact' };
  };

  const currentAct = getActInfo(scrollProgress);

  const waypoints = [
    { label: 'Origin', id: 'home', target: '#home' },
    { label: 'About', id: 'about', target: '#about' },
    { label: 'Skills', id: 'skills', target: '#skills' },
    { label: 'Projects', id: 'projects', target: '#projects' },
    { label: 'Education', id: 'education', target: '#education' },
    { label: 'DSA', id: 'coding', target: '#coding' },
    { label: 'Connect', id: 'contact', target: '#contact' },
  ];

  return (
    <>
      {/* Top Left: Cyberpunk Act Indicator */}
      <div className="fixed top-20 left-4 sm:left-8 z-40 pointer-events-auto select-none">
        <div className="p-3 rounded-xl bg-[#090e1c]/80 backdrop-blur-xl border border-blue-500/30 shadow-2xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
              WORLD ACT {currentAct.act}
            </span>
            <span className="text-xs font-mono font-bold text-slate-100 tracking-wider">
              {currentAct.name}
            </span>
          </div>
        </div>
      </div>

      {/* Right Screen: Scene Waypoints Rail */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2.5 pointer-events-auto">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-2 mb-1">
          3D Rail
        </div>
        {waypoints.map((wp, idx) => (
          <a
            key={idx}
            href={wp.target}
            onMouseEnter={() => playSciFiSound(440 + idx * 80)}
            className="group flex items-center gap-2 py-1 px-2 rounded-lg transition-all"
          >
            <span className="text-[11px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
              {wp.label}
            </span>
            <span className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-blue-400 group-hover:scale-125 transition-all shadow-sm" />
          </a>
        ))}
      </div>

      {/* Bottom Floating Bar: Controls & Recruiter Mode */}
      <aside 
        aria-label="3D Experience Controls"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
      >
        <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-2xl bg-[#080d1a]/85 backdrop-blur-2xl border border-slate-700/80 shadow-2xl shadow-black/60">
          
          {/* Recruiter Fast Mode Button */}
          <button
            type="button"
            onClick={() => {
              setRecruiterDrawerOpen(!recruiterDrawerOpen);
              playSciFiSound(680, 'triangle');
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-xs hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            title="Open Recruiter Snapshot"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Recruiter Snapshot</span>
            <span className="sm:hidden">Snapshot</span>
          </button>

          {/* Sci-Fi Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !audioEnabled;
              setAudioEnabled(next);
              if (next) playSciFiSound(880);
            }}
            className={`p-2 rounded-xl text-xs border transition-colors ${
              audioEnabled 
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title={audioEnabled ? 'Mute 3D Audio FX' : 'Enable 3D Audio FX'}
            aria-label="Toggle 3D Audio FX"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Depth Telemetry */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-slate-500">Z-Travel:</span>
            <span className="text-blue-400 font-bold">{Math.round(scrollProgress * 100)}%</span>
          </div>

          {/* Direct Social Links */}
          <div className="flex items-center gap-1">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

        </div>
      </aside>

      {/* Recruiter Intel Drawer (Guarantees zero friction for hiring managers) */}
      {recruiterDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setRecruiterDrawerOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0b101e] border border-blue-500/40 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  RECRUITER INTEL BRIEF
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Harish R</h3>
                <p className="text-xs text-slate-400 font-mono">
                  B.E. Computer Science &amp; Engineering &bull; SSN College of Engineering, Chennai
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRecruiterDrawerOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white"
              >
                Close [ESC]
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500">Graduation</span>
                <div className="text-sm font-bold text-white mt-0.5">2028</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500">CGPA</span>
                <div className="text-sm font-bold text-blue-400 mt-0.5">6.3 / 10</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500">Class 12</span>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">98.2%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500">Class 10</span>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">90.0%</div>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Core Engineering Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Spring Boot', 'MySQL', 'JDBC', 'Servlets', 'DSA', 'OOP', 'HTML5', 'CSS3', 'JavaScript', 'Git'].map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email:</span>
                <a href={`mailto:${portfolioData.personal.email}`} className="text-blue-400 font-mono hover:underline">
                  {portfolioData.personal.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone:</span>
                <a href={`tel:${portfolioData.personal.rawPhone}`} className="text-emerald-400 font-mono hover:underline">
                  {portfolioData.personal.phone}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-slate-200 font-mono">{portfolioData.personal.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="#contact"
                onClick={() => setRecruiterDrawerOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Connect</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
