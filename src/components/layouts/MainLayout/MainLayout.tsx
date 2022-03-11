import React, { FunctionComponent } from "react";

import { NavLink } from "components";
import styles from "./MainLayout.module.css";

const SpinnerIcon: FunctionComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.Spinner}
    width="44"
    height="44"
    stroke="#007cad"
    viewBox="0 0 44 44"
  >
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.165, 0.84, 0.44, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 20"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.3, 0.61, 0.355, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 0"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.165, 0.84, 0.44, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 20"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.3, 0.61, 0.355, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 0"
        />
      </circle>
    </g>
  </svg>
);

const AudioIcon: FunctionComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 3v9h-1a4 4 0 1 0 4 5V6h4V3h-7z" />
  </svg>
);

const BubbleIcon: FunctionComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M20 2H4L2 4v18l4-4h14l2-2V4l-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

const HelpIcon: FunctionComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M11 18h2v-2h-2v2zm1-16a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14c-2 0-4 2-4 4h2l2-2 2 2c0 2-3 2-3 5h2c0-2 3-2 3-5 0-2-2-4-4-4z" />
  </svg>
);

type MainLayoutProps = {
  loading: boolean;
  error?: string;
};

export const MainLayout: FunctionComponent<MainLayoutProps> = ({
  loading,
  error,
  children,
}) => {
  let content = children;

  if (loading) {
    content = <SpinnerIcon />;
  }

  if (error) {
    content = (
      <div style={{ padding: "1em" }}>
        <div>Failed to load quotes :(</div>
        <pre style={{ whiteSpace: "break-spaces" }}>{error}</pre>
      </div>
    );
  }

  return (
    <>
      <main>{content}</main>
      <Tabs />
    </>
  );
};

const Tabs = () => (
  <ul className={styles.Tabs}>
    <li className={styles.Tab}>
      <NavLink to="/">
        <>
          <BubbleIcon />
          <div>Citations</div>
        </>
      </NavLink>
    </li>
    <li className={styles.Tab}>
      <NavLink to="/quiz">
        <>
          <HelpIcon />
          <div>Quiz</div>
        </>
      </NavLink>
    </li>
    <li className={styles.Tab}>
      <NavLink to="/sounds">
        <>
          <AudioIcon />
          <div>Sons</div>
        </>
      </NavLink>
    </li>
  </ul>
);
