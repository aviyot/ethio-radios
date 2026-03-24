"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  name: string;
  src: string;
  contact: string;
}

export default function AudioPlayer({ name, src, contact }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isTrackChanging, setIsTrackChanging] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    setIsTrackChanging(true);
    const timeout = window.setTimeout(() => {
      setIsTrackChanging(false);
    }, 380);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
  };

  return (
    <section
      className={`w-full max-w-2xl rounded-3xl border border-white/15 bg-[var(--color-surface)]/80 p-5 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
        isTrackChanging ? "player-enter" : ""
      }`}
    >
      <audio ref={audioRef} src={src} preload="none" autoPlay />

      <div className="flex flex-col items-center gap-5 sm:gap-6">
        <div className="relative">
          <div className={`player-core ${isPlaying ? "is-playing" : ""}`}>
            <span className="text-2xl sm:text-3xl" aria-hidden="true">
              {isPlaying ? "| |" : "▶"}
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Now Playing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{name}</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-wide text-white/90 transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>

          <a
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--color-accent)]/70 bg-[var(--color-accent)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent)]/20"
          >
            Info
          </a>
        </div>

        <div className="w-full max-w-sm">
          <label htmlFor="volume" className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/60">
            Volume
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="volume-slider"
          />
        </div>
      </div>
    </section>
  );
}
