'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getSurahAudioUrl, getSurahById, surahs } from '@/lib/api/quran';

interface AudioPlayerProps {
  initialSurahId?: number;
}

export default function AudioPlayer({ initialSurahId = 1 }: AudioPlayerProps) {
  const t = useTranslations('player');
  const locale = useLocale();
  // Surah names: Arabic in the Arabic interface, transliterated names (already in the data) in English/French.
  const surahName = (sr: { name: string; englishName: string; frenchName: string }) =>
    locale === 'fr' ? sr.frenchName : locale === 'en' ? sr.englishName : sr.name;
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
    <div className="card-premium p-6 md:p-7 max-w-md mx-auto" style={{borderTop: '1px solid #c9a24a'}}>

      {/* اسم السورة */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{color: '#0b5d4b'}}>
          {currentSurah ? t('surah', { name: surahName(currentSurah) }) : ''}
        </h2>
        <p className="text-gray-500 text-sm mt-1">{t('reciter')}</p>
        <p className="text-xs mt-1 font-semibold" style={{color: '#8f6b1c'}}>
          {currentSurahId} / {surahs.length}
        </p>
      </div>

      {/* شريط التقدم قابل للنقر */}
      <div className="mb-4">
        <div
          className="w-full rounded-full h-2 cursor-pointer"
          style={{background: '#e3dcc8'}}
          onClick={handleProgressClick}
        >
          <div
            className="h-2 rounded-full transition-all"
            style={{width: `${progress}%`, background: 'linear-gradient(to right, #c9a24a, #1f7a55)'}}
          />
        </div>
        <div dir="ltr" className="flex justify-between text-xs text-gray-500 mt-1.5 tabular-nums">
          <span>{formatTime((progress / 100) * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* أزرار التحكم */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button onClick={handlePrev} aria-label={t('prev')} className="p-2 rounded-full transition hover:bg-black/5 cursor-pointer" style={{color: '#0b5d4b'}}>
          <SkipBack size={28} />
        </button>
        <button
          onClick={togglePlay}
          aria-label={t('playPause')}
          className="text-white rounded-full p-4 transition hover:brightness-110 cursor-pointer"
          style={{background: '#0b5d4b', boxShadow: '0 6px 18px rgba(11,93,75,0.35), inset 0 0 0 2px rgba(201,162,74,0.55)'}}
        >
          {isLoading && !isPlaying
            ? <span className="text-sm px-1">...</span>
            : isPlaying
            ? <Pause size={28} />
            : <Play size={28} />
          }
        </button>
        <button onClick={handleNext} aria-label={t('next')} className="p-2 rounded-full transition hover:bg-black/5 cursor-pointer" style={{color: '#0b5d4b'}}>
          <SkipForward size={28} />
        </button>
      </div>

      {/* قائمة السور */}
      <div className="mb-4 rounded-xl overflow-hidden" style={{border: '1px solid #e3dcc8'}}>
        <select
          aria-label={t('chooseSurah')}
          value={currentSurahId}
          onChange={e => setCurrentSurahId(Number(e.target.value))}
          className="w-full px-4 py-3 text-start outline-none font-bold"
          style={{color: '#0b5d4b', background: '#faf6ec'}}
        >
          {surahs.map(surah => (
            <option key={surah.id} value={surah.id}>
              {surah.id}. {t('surah', { name: surahName(surah) })}
            </option>
          ))}
        </select>
      </div>

      {/* التحكم في الصوت */}
      <div className="flex items-center gap-3">
        <Volume2 size={18} style={{color: '#0b5d4b'}} />
        <input aria-label={t('volume')}
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
          style={{accentColor: '#1f7a55'}}
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