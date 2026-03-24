"use client";

import { useEffect, useRef, useState } from "react";

import { getStationIconCandidates } from "../lib/favicon";

interface AudioPlayerProps {
  name: string;
  src: string;
  contact: string;
  icon?: string;
}

export default function AudioPlayer({
  name,
  src,
  contact,
  icon,
}: AudioPlayerProps) {
  const iconCandidates = getStationIconCandidates(icon, contact);
  const primaryIconUrl = iconCandidates[0] ?? "";
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
      className={`w-full max-w-2xl rounded-3xl border border-white/20 bg-surface/80 p-5 sm:p-8 shadow-2xl shadow-black/40 backdrop-blur-sm transition-all duration-300 ${
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
          <p className="text-xs uppercase tracking-widest text-white/60">
            Now Playing
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            {primaryIconUrl ? (
              <img
                src={primaryIconUrl}
                alt=""
                width={40}
                height={40}
                data-icon-candidates={iconCandidates.join("|")}
                data-icon-index="0"
                className="h-10 w-10 rounded-md bg-white/90 p-1"
                onError={(event) => {
                  const candidates =
                    event.currentTarget.dataset.iconCandidates?.split("|") ?? [];
                  const currentIndex = Number(event.currentTarget.dataset.iconIndex ?? "0");
                  const nextIndex = currentIndex + 1;

                  if (nextIndex < candidates.length) {
                    event.currentTarget.dataset.iconIndex = String(nextIndex);
                    event.currentTarget.src = candidates[nextIndex];
                    return;
                  }

                  event.currentTarget.style.display = "none";
                }}
              />
            ) : null}
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {name}
            </h2>
          </div>
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
            className="rounded-full border border-accent/70 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent transition hover:-translate-y-0.5 hover:bg-accent/20"
          >
            Info
          </a>
        </div>

        <div className="w-full max-w-sm">
          <label
            htmlFor="volume"
            className="mb-2 block text-xs uppercase tracking-widest text-white/60"
          >
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
