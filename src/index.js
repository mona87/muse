import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import App from "./App";

ReactDOM.render(
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <App />
    </div>,
  document.querySelector("#root")
);
