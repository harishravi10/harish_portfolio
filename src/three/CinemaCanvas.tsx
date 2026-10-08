import React, { useEffect, useRef } from 'react';
import { CinematicEngine } from './CinematicEngine';

interface CinemaCanvasProps {
  onProgressUpdate?: (progress: number) => void;
}

export const CinemaCanvas: React.FC<CinemaCanvasProps> = ({ onProgressUpdate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<CinematicEngine | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = new CinematicEngine(containerRef.current);
    engineRef.current = engine;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      engine.setScrollProgress(progress);
      if (onProgressUpdate) {
        onProgressUpdate(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      engine.destroy();
      engineRef.current = null;
    };
  }, [onProgressUpdate]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
};
