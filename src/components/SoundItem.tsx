import React, { FunctionComponent, useEffect, useState } from "react";

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
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (muted) {
      audio!.pause();
    }
  }, [muted]);

  useEffect(() => {
    const audio = new Audio(sound.audioUrl);
    const eventListeners = [
      {
        type: "canplaythrough",
        listener: () => {
          setLoaded(true);
          setAudio(audio);
          setDuration(audio.duration);
        },
      },
      {
        type: "error",
        listener: () => {
          console.error(`Error loading: "${sound.audioUrl}".`);
          setLoaded(false);
        },
      },
      {
        type: "play",
        listener: () => {
          setPaused(false);
          onPlay(sound.id);
        },
      },
      {
        type: "ended",
        listener: () => {
          setPaused(true);
          onPause(sound.id);
        },
      },
      {
        type: "pause",
        listener: () => {
          setPaused(true);
          onPause(sound.id);
        },
      },
      {
        type: "timeupdate",
        listener: () => {
          setProgress(audio.currentTime / audio.duration);
        },
      },
    ];

    eventListeners.forEach(({ type, listener }) =>
      audio.addEventListener(type, listener),
    );

    return () => {
      audio.pause();
      eventListeners.forEach(({ type, listener }) =>
        audio.removeEventListener(type, listener),
      );
    };
  }, [sound]);

  const play = () => {
    audio!.currentTime = 0;
    audio!.play();
  };

  const pause = () => {
    audio!.pause();
  };

  const toggle = () => (paused ? play() : pause());

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
