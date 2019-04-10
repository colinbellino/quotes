import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

import { sounds } from "../sounds";
import { AudioPlayer } from "./AudioPlayer";
import "./SoundsPage.css";

const prefix = "/sounds/";

export const SoundsPage: FunctionComponent<RouteComponentProps> = () => (
  <ul className="Sounds">
    {sounds.map(sound => (
      <li key={sound.id} className="Sound">
        <AudioPlayer
          name={sound.name}
          audioUrl={prefix + sound.audioUrl}
          thumbnailUrl={sound.thumbnailUrl}
        />
      </li>
    ))}
  </ul>
);
