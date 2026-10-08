import React, { useState, useRef } from 'react';
import type { ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glareOpacity?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 10,
  perspective = 1000,
  glareOpacity = 0.15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glareOpacity,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        perspective: `${perspective}px`,
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}

      {/* Dynamic 3D Glare Light Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-inherit overflow-hidden transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4), transparent 70%)`,
          borderRadius: 'inherit',
        }}
      />
    </div>
  );
};
