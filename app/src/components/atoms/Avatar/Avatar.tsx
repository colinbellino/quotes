import React, { FunctionComponent } from "react";

import "./Avatar.css";

type AvatarProps = {
  url?: string;
  /** Deprecated */
  color?: string;
  alt?: string;
};

export const Avatar: FunctionComponent<AvatarProps> = ({ url, alt }) => (
  <div className="Avatar">{url && <img src={url} alt={alt} />}</div>
);
