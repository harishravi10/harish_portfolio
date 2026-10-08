import React from 'react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Radial Top Light Gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] opacity-25 blur-[120px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)'
        }}
      />

      {/* Mid Left Glowing Orb */}
      <div 
        className="absolute top-[40%] -left-[200px] w-[600px] h-[600px] opacity-15 blur-[140px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)'
        }}
      />

      {/* Bottom Right Glowing Orb */}
      <div 
        className="absolute top-[75%] -right-[200px] w-[650px] h-[650px] opacity-15 blur-[140px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)'
        }}
      />

      {/* Floating subtle tech glyphs */}
      <div className="absolute top-[18%] left-[8%] text-xs font-mono text-blue-500/10 select-none hidden lg:block animate-pulse-subtle">
        &lt;Java /&gt;
      </div>
      <div className="absolute top-[32%] right-[10%] text-xs font-mono text-purple-500/10 select-none hidden lg:block animate-pulse-subtle">
        &#123; OOP &#125;
      </div>
      <div className="absolute top-[65%] left-[5%] text-xs font-mono text-indigo-500/10 select-none hidden lg:block animate-pulse-subtle">
        SELECT * FROM skills;
      </div>
      <div className="absolute top-[82%] right-[8%] text-xs font-mono text-cyan-500/10 select-none hidden lg:block animate-pulse-subtle">
        O(log n)
      </div>
    </div>
  );
};
