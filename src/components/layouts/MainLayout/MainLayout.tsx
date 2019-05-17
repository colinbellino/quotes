import React, { FunctionComponent, Suspense } from "react";

import { NavLink } from "components";
import { ReactComponent as Spinner } from "./spinner.svg";
import "./MainLayout.css";

export const MainLayout: FunctionComponent = ({ children }) => (
  <>
    <Suspense fallback={<Spinner className="Spinner" />}>{children}</Suspense>
    <ul className="Tabs">
      <li className="Tab">
        <NavLink to="/">Quotes</NavLink>
      </li>
      <li className="Tab">
        <NavLink to="/sounds/">Sounds</NavLink>
      </li>
    </ul>
  </>
);
