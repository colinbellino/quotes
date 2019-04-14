import React, { FunctionComponent, useEffect, useState } from "react";

import { Sound } from "../sounds";
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
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (muted) {
      audio!.pause();
    }
  }, [muted]);

  useEffect(() => {
    const audio = new Audio(sound.audioUrl);
    audio.addEventListener("loadeddata", () => {
      setLoaded(true);
      setAudio(audio);
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
  }, [sound]);

  const play = () => {
    audio!.currentTime = 0;
    audio!.play();
  };

  const pause = () => {
    audio!.pause();
  };

  const toggle = () => (paused ? play() : pause());

  return { loaded, paused, toggle };
};

export const SoundItem: FunctionComponent<SoundItemProps> = props => {
  const { loaded, paused, toggle } = useSoundPlayer(props);
  const { sound } = props;

  return (
    <div className={`SoundItem ${paused ? "Paused" : "Playing"}`}>
      {loaded ? (
        <button onClick={toggle}>
          <img src={sound.thumbnailUrl} alt={sound.name} />
        </button>
      ) : null}
    </div>
  );
};
