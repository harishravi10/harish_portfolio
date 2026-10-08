import React, { useState } from 'react';
import { Play, Check, Copy, Terminal, RefreshCw } from 'lucide-react';

export const CodeCard: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true); // default true so output is visible, but user can re-run
  const [copied, setCopied] = useState(false);

  const rawCode = `public class Harish {
    String role = "Java Full Stack Developer";
    String focus = "Software Development";

    public void build() {
        System.out.println("Turning ideas into applications.");
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setHasRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 450);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Ambient glow underneath */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

      {/* Editor Container */}
      <div className="relative rounded-2xl border border-slate-700/60 bg-[#0d121f]/90 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#090d17] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="ml-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131b2e] border border-slate-700/50 text-[11px] text-slate-300 font-sans">
              <span className="text-amber-400 font-bold text-xs font-mono">☕</span>
              <span>Harish.java</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 transition-colors text-[11px] font-sans font-medium"
              title="Run Java program"
              aria-label="Execute Java code"
            >
              {isRunning ? (
                <RefreshCw className="w-3 h-3 animate-spin text-blue-400" />
              ) : (
                <Play className="w-3 h-3 fill-current text-blue-400" />
              )}
              <span>{isRunning ? 'Compiling...' : 'Run'}</span>
            </button>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="p-4 sm:p-5 text-slate-200 overflow-x-auto leading-relaxed select-text">
          <div className="flex">
            {/* Line Numbers */}
            <div className="select-none text-slate-600 text-right pr-4 font-mono space-y-0.5 text-xs">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
            </div>

            {/* Syntax Highlighted Java Code */}
            <div className="space-y-0.5 whitespace-pre">
              <div>
                <span className="text-purple-400">public class </span>
                <span className="text-yellow-300 font-semibold">Harish </span>
                <span className="text-slate-400">{'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-blue-400">String </span>
                <span className="text-slate-200">role </span>
                <span className="text-slate-400">= </span>
                <span className="text-emerald-300">"Java Full Stack Developer"</span>
                <span className="text-slate-400">;</span>
              </div>
              <div className="pl-4">
                <span className="text-blue-400">String </span>
                <span className="text-slate-200">focus </span>
                <span className="text-slate-400">= </span>
                <span className="text-emerald-300">"Software Development"</span>
                <span className="text-slate-400">;</span>
              </div>
              <div></div>
              <div className="pl-4">
                <span className="text-purple-400">public void </span>
                <span className="text-blue-300">build</span>
                <span className="text-slate-400">() {'{'}</span>
              </div>
              <div className="pl-8">
                <span className="text-slate-300">System.out.</span>
                <span className="text-blue-300">println</span>
                <span className="text-slate-400">(</span>
                <span className="text-emerald-300">"Turning ideas into applications."</span>
                <span className="text-slate-400">);</span>
              </div>
              <div className="pl-4">
                <span className="text-slate-400">{'}'}</span>
              </div>
              <div>
                <span className="text-slate-400">{'}'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Terminal Output Bar */}
        <div className="bg-[#070b13] border-t border-slate-800/80 px-4 py-3 text-xs">
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1.5">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span className="font-sans text-slate-300">Terminal (OpenJDK 21)</span>
            </div>
            <span className="text-[10px] text-slate-500">Live Simulation</span>
          </div>

          {isRunning ? (
            <div className="text-slate-400 italic text-[11px] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Compiling Harish.java...
            </div>
          ) : hasRun ? (
            <div className="space-y-0.5 text-[11px]">
              <div className="text-slate-500">
                $ javac Harish.java &amp;&amp; java Harish
              </div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="text-slate-500">&gt;</span>
                Turning ideas into applications.
              </div>
              <div className="text-[10px] text-slate-600">
                Process finished with exit code 0
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-[11px]">
              Click "Run" to execute the Java code.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
