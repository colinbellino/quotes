import React, { FunctionComponent } from "react";

import { NavLink } from "components";
import styles from "./MainLayout.module.css";
import BubbleIcon from "./bubble.svg";
import AudioIcon from "./audio.svg";
import HelpIcon from "./help.svg";
// import SpinnerIcon from "./spinner.svg";

// const isServer = typeof window === "undefined";
// const fallback = <SpinnerIcon className={styles.Spinner} />;

export const MainLayout: FunctionComponent = ({ children }) => (
  <>
    {/* {isServer ? fallback : <Suspense fallback={fallback}>{children}</Suspense>} */}
    {children}
    <Tabs />
  </>
);

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
