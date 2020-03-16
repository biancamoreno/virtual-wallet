/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};

serviceWorker.unregister();

render();

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}
