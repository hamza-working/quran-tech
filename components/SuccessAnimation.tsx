'use client';

import { useEffect, useState } from 'react';
import Confetti from './Confetti';

interface SuccessAnimationProps {
  show: boolean;
  message: string;
  score?: string;
}

export default function SuccessAnimation({ show, message, score }: SuccessAnimationProps) {
  const [visible, setVisible] = useState(false);

 useEffect(() => {
  if (show) {
    setVisible(true);
  } else {
    setVisible(false);
  }
}, [show]);

  if (!visible) return null;

  return (
    <>
      <Confetti show={visible} />
      <div
        className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
      >
        <div
          className="text-center rounded-3xl p-8 shadow-2xl"
          style={{
            background: 'white',
            border: '4px solid #00cec9',
            animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          <div style={{animation: 'bounce 0.5s ease infinite alternate', display: 'inline-block'}}>
            🏆
          </div>
          <div className="text-6xl mb-2" style={{animation: 'pulse 0.5s ease infinite alternate'}}>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{color: '#006a67'}}>{message}</h2>
          {score && (
            <div className="text-4xl font-bold" style={{color: '#00cec9'}}>{score}</div>
          )}
        </div>
        <style>{`
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes bounce {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-10px) scale(1.1); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    </>
  );
}