'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  shape: 'circle' | 'square' | 'star';
}

export default function Confetti({ show }: { show: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

 useEffect(() => {
  if (!show) {
    setParticles([]);
    return;
  }

  const colors = ['#079992', '#fbbf24', '#f59e0b', '#006a67', '#34d399', '#f87171'];
  const shapes: ('circle' | 'square' | 'star')[] = ['circle', 'square', 'star'];

  const newParticles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 10 + 5,
    speedX: (Math.random() - 0.5) * 3,
    speedY: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  }));

  setParticles(newParticles);

  return () => setParticles([]);
}, [show]);

  if (!show || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'star' ? '0' : '2px',
            transform: `rotate(${p.rotation}deg)`,
            animation: `fall-${p.id % 5} ${2 + Math.random()}s linear forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall-0 { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
        @keyframes fall-1 { to { transform: translateY(110vh) translateX(50px) rotate(540deg); opacity: 0; } }
        @keyframes fall-2 { to { transform: translateY(110vh) translateX(-50px) rotate(360deg); opacity: 0; } }
        @keyframes fall-3 { to { transform: translateY(110vh) translateX(30px) rotate(900deg); opacity: 0; } }
        @keyframes fall-4 { to { transform: translateY(110vh) translateX(-30px) rotate(270deg); opacity: 0; } }
      `}</style>
    </div>
  );
}