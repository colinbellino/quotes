import React, { FunctionComponent, useEffect, useState } from "react";

import "./AudioPlayer.css";

const useAudioPlayer = (url: string) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    audio.addEventListener("loadeddata", () => {
      setLoaded(true);
    });
  }, []);

  const audio = new Audio(url);

  const toggle = (_event: any) => {
    if (!audio.paused) {
      audio.pause();
      return;
    }

    if (loaded) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return { toggle };
};

type AudioPlayerProps = {
  audioUrl: string;
  thumbnailUrl: string;
  name: string;
};

export const AudioPlayer: FunctionComponent<AudioPlayerProps> = ({
  audioUrl,
  thumbnailUrl,
  name,
}) => {
  const { toggle } = useAudioPlayer(audioUrl);

  return (
    <button className="AudioPlayer" onClick={toggle}>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={name} />
      ) : (
        <div className="Name">{name}</div>
      )}
    </button>
  );
};
