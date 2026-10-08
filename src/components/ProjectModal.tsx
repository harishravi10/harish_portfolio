import React, { useEffect } from 'react';
import type { Project } from '../data/portfolioData';
import { ProjectMockup } from './ProjectMockups';
import { GithubIcon } from './SocialIcons';
import { 
  X, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c101d] border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {project.category}
          </div>
          <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white">
            {project.title}
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* UI Visual Mockup */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Visual Interface Preview</span>
            <span className="text-slate-500">Non-stock developer mockup</span>
          </div>
          <ProjectMockup type={project.mockupType} />
        </div>

        {/* Architecture Highlights */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#090d18] border border-slate-800/80 space-y-3">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Architecture &amp; Design Decisions</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
            {project.architecture.map((arch, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>{arch}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features List */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Key Functional Features</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions / GitHub */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-mono">
            Source repository on GitHub
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
            >
              Close
            </button>
            <a
              href={project.githubUrl || 'https://github.com/harishravi10'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
