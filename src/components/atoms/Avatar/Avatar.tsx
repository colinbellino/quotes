/* eslint-disable @next/next/no-img-element */
import React, { FunctionComponent } from "react";

import styles from "./Avatar.module.css";

type AvatarProps = {
  url: string;
  alt: string;
  color: string;
  width: number;
};

export const Avatar: FunctionComponent<AvatarProps> = ({ url, alt, color, width }) => (
  <div className={`Avatar ${styles.Avatar}`} style={{ backgroundColor: color }}>
    {url && <img src={url} alt={alt} width={width} height={width} />}
  </div>
);
