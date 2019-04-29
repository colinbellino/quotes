import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Sound } from "../sounds";
import { ProgressBar } from "./ProgressBar";
import "./SoundItem.css";

type SoundItemProps = {
  sound: Sound;
  muted: boolean;
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
};

const useSoundPlayer = (props: SoundItemProps) => {
  const { sound, muted, onPlay, onPause } = props;

  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();

  const play = useCallback(() => {
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
  }, [audio]);

  const pause = useCallback(() => {
    audio && audio.pause();
  }, [audio]);

  const toggle = useCallback(() => (paused ? play() : pause()), [
    pause,
    paused,
    play,
  ]);

  useEffect(() => {
    muted && pause();
  }, [muted, pause]);

  useEffect(() => {
    const audioElement = new Audio(sound.audioUrl);
    audioElement.addEventListener("canplaythrough", () => {
      setLoaded(true);
      setAudio(audioElement);
      setDuration(audioElement.duration);
    });
    audioElement.addEventListener("error", () => {
      console.error(`Error loading: "${sound.audioUrl}".`);
      setLoaded(false);
    });
    audioElement.addEventListener("play", () => {
      setPaused(false);
      onPlay(sound.id);
    });
    audioElement.addEventListener("ended", () => {
      setPaused(true);
      onPause(sound.id);
    });
    audioElement.addEventListener("pause", () => {
      setPaused(true);
      onPause(sound.id);
    });
    audioElement.addEventListener("timeupdate", () => {
      setProgress(audioElement.currentTime / audioElement.duration);
    });
  }, [sound]);

  return { loaded, paused, progress, duration, toggle };
};

const useTimeout = (timeInMs: number) => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(setTimedOut, timeInMs, true);
    return () => clearTimeout(timer);
  }, [timeInMs]);

  return timedOut;
};

export const SoundItem: FunctionComponent<SoundItemProps> = props => {
  const { loaded, paused, progress, duration, toggle } = useSoundPlayer(props);
  const timedOut = useTimeout(10000);
  const { sound } = props;

  return (
    <div className={`SoundItem ${paused ? "Paused" : "Playing"}`}>
      <button
        className={[
          "SoundItemButton",
          !loaded && timedOut && "TimedOut",
          !loaded && !timedOut && "Loading",
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={!loaded}
        onClick={toggle}
      >
        <img src={sound.thumbnailUrl} alt={sound.name} />
      </button>
      {<ProgressBar value={progress} enabled={!paused && duration > 0.5} />}
    </div>
  );
};
