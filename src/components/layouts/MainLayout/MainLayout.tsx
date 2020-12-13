import React, { FunctionComponent } from "react";

import { NavLink } from "components";
import styles from "./MainLayout.module.css";
import BubbleIcon from "./bubble.svg";
import AudioIcon from "./audio.svg";
import HelpIcon from "./help.svg";
import SpinnerIcon from "./spinner.svg";

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
    content = <SpinnerIcon className={styles.Spinner} />;
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
