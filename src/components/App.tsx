import React, { FunctionComponent } from "react";
import { Router, RouteComponentProps } from "@reach/router";

import { Quotes } from "./Quotes";
import { AdminPage } from "./AdminPage";
import "./App.css";

const QuotesPage: FunctionComponent<RouteComponentProps> = () => <Quotes />;

export const App: FunctionComponent = () => (
  <div className="App">
    <h1 className="Title">Out of context</h1>
    <Router>
      <QuotesPage path="/" />
      <AdminPage path="/admin" />
    </Router>
  </div>
);
