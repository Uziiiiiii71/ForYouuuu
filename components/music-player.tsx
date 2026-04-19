'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Music, X } from 'lucide-react';

const playlist = [
  {
    id: 1,
    title: 'Kisah Kita 💖',
    artist: 'Penyanyi Pilihanmu',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-110098.mp3'
  },
  {
    id: 2,
    title: 'Abadi',
    artist: 'Perunggu',
    src: '/music/abadi-perunggu.mp3'
  }
];

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎧 HANDLE PLAY / PAUSE
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // 🔥 IMPORTANT: reload audio saat lagu berubah
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  // ▶️ TOGGLE PLAY
  const togglePlay = (e?: any) => {
    if (e) e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  // ⏭ NEXT SONG
  const nextSong = (e?: any) => {
    if (e) e.stopPropagation();
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  // ⏮ PREV SONG
  const prevSong = (e?: any) => {
    if (e) e.stopPropagation();
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  // 🔁 AUTO NEXT
  const handleEnded = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  return (
    <>
      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={playlist[currentSong].src}
        onEnded={handleEnded}
      />

      {/* PLAYER UI */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="closed"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(true)}
              className="bg-white shadow-sleek border border-rose-200 text-rose-500 rounded-full p-4 flex items-center justify-center"
            >
              <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse text-rose-600' : ''}`} />
            </motion.button>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="bg-white shadow-lg border border-rose-200 rounded-3xl p-5 w-72"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase text-rose-500 font-semibold">
                  Our Playlist
                </span>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4 text-rose-400" />
                </button>
              </div>

              {/* SONG INFO */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center relative">
                  <Music className="w-5 h-5 text-rose-400" />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-rose-500/10 animate-pulse rounded-full" />
                  )}
                </div>

                <div className="overflow-hidden">
                  <h4 className="text-lg text-rose-900 truncate">
                    {playlist[currentSong].title}
                  </h4>
                  <p className="text-xs text-rose-600 truncate">
                    {playlist[currentSong].artist}
                  </p>
                </div>
              </div>

              {/* PROGRESS FAKE */}
              <div className="h-1 bg-rose-100 rounded-full mb-5 overflow-hidden">
                <motion.div
                  className="bg-rose-500 h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: isPlaying ? '100%' : '0%' }}
                  transition={{ duration: 180, ease: 'linear' }}
                />
              </div>

              {/* CONTROLS */}
              <div className="flex items-center justify-center gap-6">
                <button onClick={prevSong}>
                  <SkipBack className="w-5 h-5 text-rose-400" />
                </button>

                <button
                  onClick={togglePlay}
                  className="bg-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-1" />
                  )}
                </button>

                <button onClick={nextSong}>
                  <SkipForward className="w-5 h-5 text-rose-400" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
