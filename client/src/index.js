import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

// initialize redux
// provider will keep track of the store from anywhere in app
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Components imports
import { reducers } from './reducers';
import App from "./App";

//find the minimized version of bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// CSS imports
import "./css/index.css";

// createStore takes in the reducers and compose function
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
