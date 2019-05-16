import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps } from "@reach/router";

import { sounds } from "data";
import { SoundItem, MainLayout } from "components";
import "./SoundsPage.css";

type SoundsPageViewProps = {
  playing?: string;
  onPlay?: (id: string) => void;
  onPause?: (id: string) => void;
};

export const SoundsPageView = ({
  playing,
  onPlay = () => {},
  onPause = () => {},
}: SoundsPageViewProps) => (
  <MainLayout>
    <ul className="SoundsPage">
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
  </MainLayout>
);

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

  return SoundsPageView({ playing, onPlay, onPause });
};
