import React, { FunctionComponent, Suspense } from "react";

import { NavLink } from "components";
import { ReactComponent as SpinnerIcon } from "./spinner.svg";
import { ReactComponent as BubbleIcon } from "./bubble.svg";
import { ReactComponent as AudioIcon } from "./audio.svg";
import "./MainLayout.css";

export const MainLayout: FunctionComponent = ({ children }) => (
  <>
    <Suspense fallback={<SpinnerIcon className="Spinner" />}>
      {children}
    </Suspense>
    <ul className="Tabs">
      <li className="Tab">
        <NavLink to="/">
          <BubbleIcon /> <div>Quotes</div>
        </NavLink>
      </li>
      <li className="Tab">
        <NavLink to="/sounds/">
          <AudioIcon /> <div>Sounds</div>
        </NavLink>
      </li>
    </ul>
  </>
);
