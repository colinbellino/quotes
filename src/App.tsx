import React, { FunctionComponent } from "react";
import { Router } from "@reach/router";

import {
  GamePage,
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
      <GamePage path="/game" />
    </Router>
  </MainLayout>
);
