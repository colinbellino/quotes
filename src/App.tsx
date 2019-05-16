import React, { FunctionComponent } from "react";
import { Router } from "@reach/router";

import { QuotesPage, SoundsPage } from "./components";

export const App: FunctionComponent = () => (
  <Router>
    <QuotesPage path="/" />
    <SoundsPage path="/sounds/" />
  </Router>
);
