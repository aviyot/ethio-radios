"use client";

import { useEffect, useRef, useState } from "react";

import StationIcon from "./StationIcon";

interface AudioPlayerProps {
  name: string;
  src: string;
  contact: string;
  icon?: string;
}

function PlayPauseIcon({
  isPlaying,
  className,
}: {
  isPlaying: boolean;
  className: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {isPlaying ? (
        <>
          <path d="M6 5h4v14H6z" />
          <path d="M14 5h4v14h-4z" />
        </>
      ) : (
        <path d="M7 4.5v15l12-7.5z" />
      )}
    </svg>
  );
}

export default function AudioPlayer({
  name,
  src,
  contact,
  icon,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isTrackChanging, setIsTrackChanging] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

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
      className={`w-full max-w-2xl rounded-3xl border border-white/20 bg-surface/80 p-5 sm:p-8 shadow-2xl shadow-black/40 backdrop-blur-sm transition-all duration-300 ${
        isTrackChanging ? "player-enter" : ""
      }`}
    >
      <audio ref={audioRef} src={src} preload="none" autoPlay />

      <div className="flex flex-col items-center gap-5 sm:gap-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/60">
            Now Playing
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <StationIcon
              contact={contact}
              icon={icon}
              size={40}
              loading="eager"
              className="h-10 w-10 rounded-md bg-white/90 p-1"
            />
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {name}
            </h2>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsInfoOpen((open) => !open)}
                aria-label={
                  isInfoOpen
                    ? "Close station information"
                    : "Show station information"
                }
                aria-expanded={isInfoOpen}
                aria-controls="station-information"
                className="rounded-full border border-accent/70 bg-accent/10 p-2 text-accent transition hover:-translate-y-0.5 hover:bg-accent/20"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5" />
                  <path d="M12 8h.01" />
                </svg>
              </button>
              {isInfoOpen && (
                <div
                  id="station-information"
                  className="absolute right-0 top-full z-10 mt-3 w-64 rounded-2xl border border-white/20 bg-surface p-4 text-left shadow-xl shadow-black/40"
                >
                  <h3 className="text-sm font-semibold text-white">
                    Station information
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-wide text-white/50">
                    Station
                  </p>
                  <p className="mt-1 text-sm text-white">{name}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-white/50">
                    Contact
                  </p>
                  <p className="mt-1 break-all text-sm text-white/80">
                    {contact}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="rounded-full border border-white/20 bg-white/10 p-4 text-white transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            <PlayPauseIcon isPlaying={isPlaying} className="h-8 w-8" />
          </button>

        </div>

        <div className="w-full max-w-sm">
          <label
            htmlFor="volume"
            className="mb-2 block text-xs uppercase tracking-widest text-white/60"
          >
            Volume
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              aria-label={isMuted ? "Unmute" : "Mute"}
              aria-pressed={isMuted}
              className="shrink-0 rounded-full border border-white/20 p-2 text-white/90 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                {isMuted ? (
                  <>
                    <path d="m16 9 5 6" />
                    <path d="m21 9-5 6" />
                  </>
                ) : (
                  <>
                    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                  </>
                )}
              </svg>
            </button>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="volume-slider min-w-0 flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
