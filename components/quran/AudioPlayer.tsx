'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { getSurahAudioUrl, getSurahById, surahs } from '@/lib/api/quran';

interface AudioPlayerProps {
  initialSurahId?: number;
}

export default function AudioPlayer({ initialSurahId = 1 }: AudioPlayerProps) {
  const [currentSurahId, setCurrentSurahId] = useState(initialSurahId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSurah = getSurahById(currentSurahId);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const url = getSurahAudioUrl(currentSurahId);
    audio.pause();
    audio.src = url;
    audio.load();
    setProgress(0);
    setDuration(0);
    setIsLoading(true);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentSurahId]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const handleNext = () => {
    if (currentSurahId < surahs.length) {
      setCurrentSurahId(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSurahId > 1) {
      setCurrentSurahId(prev => prev - 1);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;
    setProgress((audio.currentTime / audio.duration) * 100);
    setDuration(audio.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md mx-auto" style={{border: '3px solid #079992'}}>

      {/* اسم السورة */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold" style={{color: '#0e6b55'}}>
          سورة {currentSurah?.name}
        </h2>
        <p className="text-gray-400 text-sm mt-1">الشيخ ياسين الجزائري — رواية ورش</p>
        <p className="text-xs mt-1" style={{color: '#079992'}}>
          {currentSurahId} / {surahs.length}
        </p>
      </div>

      {/* شريط التقدم قابل للنقر */}
      <div className="mb-4">
        <div
          className="w-full rounded-full h-3 cursor-pointer"
          style={{background: '#e8f8f5'}}
          onClick={handleProgressClick}
        >
          <div
            className="h-3 rounded-full transition-all"
            style={{width: `${progress}%`, background: 'linear-gradient(to right, #079992, #0e6b55)'}}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime((progress / 100) * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* أزرار التحكم */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button onClick={handlePrev} className="transition hover:opacity-70" style={{color: '#0e6b55'}}>
          <SkipBack size={28} />
        </button>
        <button
          onClick={togglePlay}
          className="text-white rounded-full p-4 transition hover:opacity-90"
          style={{background: 'linear-gradient(135deg, #079992, #0e6b55)', boxShadow: '0 4px 15px rgba(0,206,201,0.4)'}}
        >
          {isLoading && !isPlaying
            ? <span className="text-sm px-1">...</span>
            : isPlaying
            ? <Pause size={28} />
            : <Play size={28} />
          }
        </button>
        <button onClick={handleNext} className="transition hover:opacity-70" style={{color: '#0e6b55'}}>
          <SkipForward size={28} />
        </button>
      </div>

      {/* قائمة السور */}
      <div className="mb-4 rounded-2xl overflow-hidden" style={{border: '2px solid #e8f8f5'}}>
        <select
          value={currentSurahId}
          onChange={e => setCurrentSurahId(Number(e.target.value))}
          className="w-full px-4 py-3 text-right outline-none font-bold"
          style={{color: '#0e6b55', background: '#f0fffe'}}
        >
          {surahs.map(surah => (
            <option key={surah.id} value={surah.id}>
              {surah.id}. سورة {surah.name}
            </option>
          ))}
        </select>
      </div>

      {/* التحكم في الصوت */}
      <div className="flex items-center gap-3">
        <Volume2 size={18} style={{color: '#0e6b55'}} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
          style={{accentColor: '#079992'}}
        />
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        onLoadedMetadata={() => {
          setIsLoading(false);
          handleTimeUpdate();
        }}
        onCanPlay={() => setIsLoading(false)}
      />
    </div>
  );
}