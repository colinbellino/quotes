import React, { FunctionComponent } from "react";
import { Router, RouteComponentProps } from "@reach/router";

import { Quotes } from "./Quotes";
import { SoundsPage } from "./SoundsPage";
import "./App.css";
import { NavLink } from "./NavLink";

const QuotesPage: FunctionComponent<RouteComponentProps> = () => <Quotes />;

export const App: FunctionComponent = () => (
  <>
    <main>
      <Router>
        <QuotesPage path="/" />
        <SoundsPage path="/sounds/" />
      </Router>
    </main>
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
