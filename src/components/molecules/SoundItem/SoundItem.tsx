import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Sound } from "data";
import { ProgressBar } from "components";
import "./SoundItem.css";

type SoundItemProps = {
  sound: Sound;
  muted: boolean;
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
};

const useSoundPlayer = (props: SoundItemProps) => {
  const { sound, muted, onPlay, onPause } = props;

  const [activated, setActivated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();

  const play = useCallback(() => {
    if (!audio) {
      return;
    }

    if (!activated) {
      setActivated(true);
    }

    audio.currentTime = 0;
    audio.play();
  }, [audio, activated]);

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
    setAudio(audioElement);

    audioElement.addEventListener("canplaythrough", () => {
      setLoaded(true);
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
      setProgress((audioElement.currentTime / audioElement.duration) * 100);
    });
  }, [sound, onPause, onPlay]);

  return {
    loading: activated && !loaded,
    paused,
    progress,
    duration,
    toggle,
  };
};

export const SoundItem: FunctionComponent<SoundItemProps> = props => {
  const { loading, paused, progress, duration, toggle } = useSoundPlayer(props);
  const { sound } = props;

  return (
    <div className={`SoundItem ${paused ? "Paused" : "Playing"}`}>
      <button disabled={loading} onClick={toggle}>
        <img src={sound.thumbnailUrl} alt={sound.name} />
      </button>
      {<ProgressBar value={progress} enabled={!paused && duration > 0.5} />}
    </div>
  );
};
