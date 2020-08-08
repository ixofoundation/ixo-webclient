import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createPublicSiteStore } from "./common/redux/store";
import { AppConnected } from "./modules/App/App";
import * as serviceWorker from "./serviceWorker";

const store = createPublicSiteStore() as any;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppConnected />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
