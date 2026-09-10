"use client";

import { useEffect, useId, useRef, useState } from "react";

export type YogaAudioTrack = {
  id: string;
  title: string;
  durationLabel: string;
  src: string;
  still: string;
  stillAlt: string;
};

const pauseOthersEvent = "deinequelle:pause-yoga-audio";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function YogaAudioCard({ track }: { track: YogaAudioTrack }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressId = useId();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      window.dispatchEvent(new CustomEvent(pauseOthersEvent, { detail: track.id }));
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setPlaying(false);
      setCurrent(0);
    };
    const onPauseOthers = (event: Event) => {
      const otherId = (event as CustomEvent<string>).detail;
      if (otherId !== track.id) {
        audio.pause();
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("canplay", onMeta);
    audio.addEventListener("ended", onEnded);
    window.addEventListener(pauseOthersEvent, onPauseOthers);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("canplay", onMeta);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener(pauseOthersEvent, onPauseOthers);
    };
  }, [track.id]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };

  const max = duration > 0 ? duration : 0;

  return (
    <article className="yoga-audio-card">
      <div className={`yoga-audio-still${playing ? " is-playing" : ""}`}>
        <img src={track.still} alt={track.stillAlt} />
        <button
          type="button"
          className="yoga-audio-play"
          onClick={toggle}
          aria-label={
            playing
              ? `${track.title} (${track.durationLabel}) pausieren`
              : `${track.title} (${track.durationLabel}) abspielen`
          }
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4.5" height="14" rx="1" />
              <rect x="13.5" y="5" width="4.5" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.2 5.2v13.6c0 .7.8 1.1 1.4.7l10.2-6.8c.5-.4.5-1.1 0-1.4L9.6 4.5c-.6-.4-1.4 0-1.4.7Z" />
            </svg>
          )}
        </button>
      </div>
      <div className="yoga-audio-meta">
        <p className="yoga-audio-kicker">{track.durationLabel}</p>
        <h3 className="yoga-audio-title">{track.title}</h3>
        <div className="yoga-audio-controls">
          <label className="visually-hidden" htmlFor={progressId}>
            Wiedergabeposition
          </label>
          <input
            id={progressId}
            className="yoga-audio-range"
            type="range"
            min={0}
            max={max || 0}
            step={0.1}
            value={Math.min(current, max || 0)}
            onChange={(event) => seek(Number(event.target.value))}
          />
          <p className="yoga-audio-time">
            <span>{formatTime(current)}</span>
            <span>{duration ? formatTime(duration) : track.durationLabel}</span>
          </p>
        </div>
      </div>
      <audio ref={audioRef} preload="metadata" src={track.src} />
    </article>
  );
}

export function YogaAudioPlayer({ tracks }: { tracks: YogaAudioTrack[] }) {
  if (!tracks.length) return null;

  return (
    <div className="yoga-audio-grid reveal d1">
      {tracks.map((track) => (
        <YogaAudioCard key={track.id} track={track} />
      ))}
    </div>
  );
}
