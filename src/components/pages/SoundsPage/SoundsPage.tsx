import React, { useState } from "react";

import { sounds } from "data";
import { MainLayout, SoundItem } from "components";
import styles from "./SoundsPage.module.css";

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
    <main>
      <ul className={styles.SoundsPage}>
        {sounds.map((sound) => (
          <li key={sound.id} className={styles.Sound}>
            <SoundItem
              sound={sound}
              muted={playing ? playing !== sound.id : false}
              onPlay={onPlay}
              onPause={onPause}
            />
          </li>
        ))}
      </ul>
    </main>
  </MainLayout>
);

export const SoundsPage = () => {
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
