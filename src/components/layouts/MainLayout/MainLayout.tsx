import React, { FunctionComponent } from "react";

import { NavLink } from "components";
import styles from "./MainLayout.module.css";
import BubbleIcon from "./bubble.svg";
import AudioIcon from "./audio.svg";
import HelpIcon from "./help.svg";
import SpinnerIcon from "./spinner.svg";

type MainLayoutProps = {
  loading: boolean;
};

export const MainLayout: FunctionComponent<MainLayoutProps> = ({
  loading,
  children,
}) => (
  <>
    <main>
      {loading ? <SpinnerIcon className={styles.Spinner} /> : children}
    </main>
    <Tabs />
  </>
);

const Tabs = () => (
  <ul className={styles.Tabs}>
    <li className={styles.Tab}>
      <NavLink to="/">
        <>
          <BubbleIcon width={18} />
          <div>Citations</div>
        </>
      </NavLink>
    </li>
    <li className={styles.Tab}>
      <NavLink to="/quiz">
        <>
          <HelpIcon width={18} />
          <div>Quiz</div>
        </>
      </NavLink>
    </li>
    <li className={styles.Tab}>
      <NavLink to="/sounds">
        <>
          <AudioIcon width={18} />
          <div>Sons</div>
        </>
      </NavLink>
    </li>
  </ul>
);
