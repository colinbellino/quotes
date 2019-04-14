import React, { FunctionComponent } from "react";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  progress,
}) => (
  <div className="Progress">
    <div
      className="ProgressSlider"
      style={{ transform: `scaleX(${progress})` }}
    />
  </div>
);
