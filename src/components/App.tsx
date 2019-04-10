import React, { FunctionComponent } from "react";
import { Router, RouteComponentProps } from "@reach/router";

import { Quotes } from "./Quotes";
import { SoundPage } from "./SoundPage";
import "./App.css";

const QuotesPage: FunctionComponent<RouteComponentProps> = () => <Quotes />;

export const App: FunctionComponent = () => (
  <div className="App">
    <h1 className="Title">Out of context</h1>
    <Router>
      <QuotesPage path="/" />
      <SoundPage path="/sound" />
    </Router>
  </div>
);
