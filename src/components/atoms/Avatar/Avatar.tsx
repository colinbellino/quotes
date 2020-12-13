import React, { FunctionComponent } from "react";

import styles from "./Avatar.module.css";

type AvatarProps = {
  url?: string;
  alt?: string;
  color?: string;
};

export const Avatar: FunctionComponent<AvatarProps> = ({ url, alt, color }) => (
  <div className={`Avatar ${styles.Avatar}`} style={{ backgroundColor: color }}>
    {url && <img src={url} alt={alt} />}
  </div>
);
