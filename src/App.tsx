import React, { FunctionComponent } from "react";
import { Router } from "@reach/router";

import {
  MainLayout,
  PersonPage,
  QuizPage,
  QuotesPage,
  SoundsPage,
} from "./components";

export const App: FunctionComponent = () => (
  <MainLayout>
    <Router className="Router">
      <QuotesPage path="/" />
      <SoundsPage path="/sounds" />
      <QuizPage path="/quiz" />
      <PersonPage path="/person/:id" />
    </Router>
  </MainLayout>
);
