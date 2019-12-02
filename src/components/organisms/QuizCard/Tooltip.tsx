import React, { FunctionComponent } from "react";

import "./Tooltip.css";

export const Tooltip: FunctionComponent<{ content: string }> = ({
  content,
  children,
}) => (
  <div className="Tooltip">
    <div className="Content">{content}</div>
    {children}
  </div>
);
