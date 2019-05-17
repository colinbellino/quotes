import React, { FunctionComponent } from "react";
import { Router } from "@reach/router";

import { MainLayout, QuotesPage, SoundsPage, PersonPage } from "./components";

export const App: FunctionComponent = () => (
  <MainLayout>
    <Router className="Router">
      <QuotesPage path="/" />
      <SoundsPage path="/sounds" />
      <PersonPage path="/person/:id" />
    </Router>
  </MainLayout>
);
