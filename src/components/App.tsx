import React, { FunctionComponent } from "react";

import { Quotes } from "./Quotes";
import "./App.css";

export const App: FunctionComponent = () => (
  <div className="App">
    <h1 className="Title">Out of context</h1>
    <Quotes />
  </div>
);
