import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps } from "@reach/router";

import { sounds } from "../sounds";
import { SoundItem } from "./SoundItem";
import "./SoundsPage.css";

export const SoundsPage: FunctionComponent<RouteComponentProps> = () => {
  const [playing, setPlaying] = useState<string>();
  const onPlay = (id: string) => {
    setPlaying(id);
  };
  const onPause = (id: string) => {
    if (id === playing) {
      setPlaying(undefined);
    }
  };

  return (
    <ul className="Sounds">
      {sounds.map(sound => (
        <li key={sound.id} className="Sound">
          <SoundItem
            sound={sound}
            muted={playing ? playing !== sound.id : false}
            onPlay={onPlay}
            onPause={onPause}
          />
        </li>
      ))}
    </ul>
  );
};
