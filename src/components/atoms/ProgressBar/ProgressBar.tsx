import React, { FunctionComponent } from "react";

import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  value: number;
  enabled?: boolean;
};

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  value,
  enabled = false,
}) => (
  <div
    className={`${styles.ProgressBar} ${
      enabled ? styles.Enabled : styles.Disabled
    }`}
  >
    <div
      className={styles.ProgressSlider}
      style={{ transform: `scaleX(${enabled ? value / 100 : 0})` }}
    />
  </div>
);
