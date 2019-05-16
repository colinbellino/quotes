import React, { FunctionComponent } from "react";

import "./ProgressBar.css";

type ProgressBarProps = {
  value: number;
  enabled?: boolean;
};

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  value,
  enabled = false,
}) => (
  <div className={`ProgressBar ${enabled ? "Enabled" : "Disabled"}`}>
    <div
      className="ProgressSlider"
      style={{ transform: `scaleX(${enabled ? value / 100 : 0})` }}
    />
  </div>
);
