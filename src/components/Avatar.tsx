import React, { FunctionComponent } from "react";

import "./Avatar.css";

type AvatarProps = {
  color?: string;
  url?: string;
};

export const Avatar: FunctionComponent<AvatarProps> = ({ url, color }) => (
  <div className="Avatar" style={{ borderColor: color }}>
    {url && <img src={url} />}
  </div>
);
