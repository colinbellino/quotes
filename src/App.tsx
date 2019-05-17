import React, { FunctionComponent } from "react";
import { Router } from "@reach/router";

import { QuotesPage, SoundsPage, MainLayout } from "./components";

export const App: FunctionComponent = () => (
  <MainLayout>
    <Router className="Router">
      <QuotesPage path="/" />
      <SoundsPage path="/sounds/" />
    </Router>
  </MainLayout>
);
