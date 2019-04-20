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
    const audio = new Audio(sound.audioUrl);
    audio.addEventListener("canplaythrough", () => {
      setLoaded(true);
      setAudio(audio);
      setDuration(audio.duration);
    });
    audio.addEventListener("error", () => {
      console.error(`Error loading: "${sound.audioUrl}".`);
      setLoaded(false);
    });
    audio.addEventListener("play", () => {
      setPaused(false);
      onPlay(sound.id);
    });
    audio.addEventListener("ended", () => {
      setPaused(true);
      onPause(sound.id);
    });
    audio.addEventListener("pause", () => {
      setPaused(true);
      onPause(sound.id);
    });
    audio.addEventListener("timeupdate", () => {
      setProgress(audio.currentTime / audio.duration);
    });
  }, [sound]);

  return { loaded, paused, progress, duration, toggle };
};

export const SoundItem: FunctionComponent<SoundItemProps> = props => {
  const { loaded, paused, progress, duration, toggle } = useSoundPlayer(props);
  const { sound } = props;

  return (
    <div className={`SoundItem ${paused ? "Paused" : "Playing"}`}>
      {loaded ? (
        <button onClick={toggle}>
          <img src={sound.thumbnailUrl} alt={sound.name} />
        </button>
      ) : null}
      {<ProgressBar value={progress} enabled={!paused && duration > 0.5} />}
    </div>
  );
};
