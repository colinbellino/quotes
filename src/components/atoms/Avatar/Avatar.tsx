import React, { FunctionComponent } from "react";

import styles from "./Avatar.module.css";

type AvatarProps = {
  url?: string;
  /** Deprecated */
  color?: string;
  alt?: string;
};

export const Avatar: FunctionComponent<AvatarProps> = ({ url, alt }) => (
  <div className={`Avatar ${styles.Avatar}`}>
    {url && <img src={url} alt={alt} />}
  </div>
);
