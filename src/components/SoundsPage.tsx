import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

const sounds = [
  // TODO: Choose one image per sound
  // TODO: Cut the sounds
  { id: "id_1", url: "/sounds/76 - Bref. Je suis en mode survie..mp3" },
  { id: "id_2", url: "/sounds/Bender - Neat!.mp3" },
  {
    id: "id_3",
    url: "/sounds/Chest Opening Sound Legend of Zelda Ocarina of Time.mp3",
  },
  { id: "id_4", url: "/sounds/David Goodenough - JDG.mp3" },
  { id: "id_5", url: "/sounds/dora c'est gagné.mp3" },
  { id: "id_6", url: "/sounds/elle est ou jeanne.mp3" },
  { id: "id_7", url: "/sounds/elle maguiche !.mp3" },
  { id: "id_8", url: "/sounds/Hotel Mario - Non HD.mp3" },
  { id: "id_9", url: "/sounds/I immediately regret this decision!.mp3" },
  {
    id: "id_10",
    url: "/sounds/Its Over 9000!!! [Original Video and Audio].mp3",
  },
  {
    id: "id_11",
    url: "/sounds/Les vrais et les mauvais chasseurs (les Inconnus).mp3",
  },
  { id: "id_12", url: "/sounds/Motus boule noire.mp3" },
  { id: "id_13", url: "/sounds/On s'en bat les couilles.mp3" },
  { id: "id_14", url: "/sounds/Parodie Masterchef - Palmashow.mp3" },
  { id: "id_15", url: "/sounds/Putin de Mongoles de merde !.mp3" },
  { id: "id_16", url: "/sounds/Sauf une fois au chalet.mp3" },
  { id: "id_17", url: "/sounds/Scrubs Sad Melody !HQ!.mp3" },
  {
    id: "id_18",
    url: "/sounds/Simon & Garfunkel - The Sound Of Silence [HD].mp3",
  },
  { id: "id_19", url: "/sounds/The Office- Michael Scott No God No.mp3" },
  {
    id: "id_20",
    url: "/sounds/アンダーザシー - 1989 ,UNDER THE SEA JAPANESE 1989.mp3",
  },
];

export const SoundsPage: FunctionComponent<RouteComponentProps> = () => {
  const audios = sounds.map(sound => new Audio(sound.url));

  const stopAllAudio = () => {
    audios.forEach(audio => {
      audio.pause();
    });
  };

  const playAudio = (index: number) => () => {
    stopAllAudio();
    audios[index].play();
  };

  const stopAudio = (index: number) => () => {
    stopAllAudio();
    audios[index].pause();
  };

  return (
    <ul>
      {sounds.map((sound, index) => (
        <li key={sound.id}>
          <button onClick={playAudio(index)}>Play</button>
          <button onClick={stopAudio(index)}>Pause</button>
          {sound.url}
        </li>
      ))}
    </ul>
  );
};
