'use client';

import { useState, useRef } from 'react';

interface AudioClipProps {
  url: string;
  color: string;
  startTime?: number;
  duration?: number;
}

export default function AudioClip({ url, color, startTime = 0, duration = 15 }: AudioClipProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    audio.currentTime = startTime;
    audio.play();
    setIsPlaying(true);

    timerRef.current = setTimeout(() => {
      audio.pause();
      setIsPlaying(false);
    }, duration * 1000);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handlePlay}
        className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white transition hover:opacity-90"
        style={{background: color}}
      >
        {isPlaying ? '⏹️ إيقاف' : '▶️ استمع للمثال'}
      </button>
      <span className="text-xs text-gray-400">
        {duration} {' '}ثانية
      </span>
      <audio ref={audioRef} src={url} />
    </div>
  );
}