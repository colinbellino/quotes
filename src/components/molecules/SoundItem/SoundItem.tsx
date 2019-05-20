import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Sound } from "data";
import { ProgressBar } from "components";
import "./SoundItem.css";

type SoundItemViewProps = {
  sound: Sound;
  paused: boolean;
  loading: boolean;
  progress: number;
  duration: number;
  toggle: () => void;
};

export const SoundItemView: FunctionComponent<SoundItemViewProps> = ({
  sound,
  paused,
  loading,
  progress,
  duration,
  toggle,
}) => (
  <div className={`SoundItem ${paused ? "Paused" : "Playing"}`}>
    <button disabled={loading} onClick={toggle}>
      <img src={sound.thumbnailUrl} alt={sound.name} />
    </button>
    {<ProgressBar value={progress} enabled={!paused && duration > 0.5} />}
  </div>
);

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
    if (audio) {
      audio.pause();
    }
  }, [audio]);

  const toggle = useCallback(() => (paused ? play() : pause()), [
    pause,
    paused,
    play,
  ]);

  useEffect(() => {
    if (muted) {
      pause();
    }
  }, [muted, pause]);

  useEffect(() => {
    const audioElement = new Audio(sound.audioUrl);
    setAudio(audioElement);

    const eventListeners: { [key: string]: () => void } = {
      canplaythrough: () => {
        setLoaded(true);
        setDuration(audioElement.duration);
      },
      error: () => {
        console.error(`Error loading: "${sound.audioUrl}".`);
        setLoaded(false);
      },
      play: () => {
        setPaused(false);
        onPlay(sound.id);
      },
      ended: () => {
        setPaused(true);
        onPause(sound.id);
      },
      pause: () => {
        setPaused(true);
        onPause(sound.id);
      },
      timeupdate: () => {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
      },
    };
    const eventListenerKeys = Object.keys(eventListeners);

    eventListenerKeys.forEach(key =>
      audioElement.addEventListener(key, eventListeners[key]),
    );

    return () => {
      audioElement.pause();
      eventListenerKeys.forEach(key =>
        audioElement.removeEventListener(key, eventListeners[key]),
      );
    };
  }, [sound]); // eslint-disable-line react-hooks/exhaustive-deps

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

  return SoundItemView({ sound, paused, loading, progress, duration, toggle });
};
