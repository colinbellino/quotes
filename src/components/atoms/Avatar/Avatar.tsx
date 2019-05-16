import React, { FunctionComponent } from "react";

import "./Avatar.css";

type AvatarProps = {
  url?: string;
  color?: string;
  alt?: string;
};

export const Avatar: FunctionComponent<AvatarProps> = ({ url, alt, color }) => (
  <div className="Avatar" style={{ borderColor: color }}>
    {url && <img src={url} alt={alt} />}
  </div>
);
