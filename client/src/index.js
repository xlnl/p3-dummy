import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

// Components imports
import App from "./App";

//find the minimized version of bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// CSS imports
import "./css/index.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
