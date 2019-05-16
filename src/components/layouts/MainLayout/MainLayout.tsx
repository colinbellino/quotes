import React, { FunctionComponent } from "react";

import { NavLink } from "components";
import "./MainLayout.css";

export const MainLayout: FunctionComponent = ({ children }) => (
  <>
    <main>{children}</main>
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
