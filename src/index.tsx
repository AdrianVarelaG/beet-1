import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Keycloak from "keycloak-js";

import * as serviceWorker from "./serviceWorker";

let initOptions: Keycloak.KeycloakConfig = {
  url: (window as any)._env_?.KEYCLOAK_URL,
  realm: (window as any)._env_?.KEYCLOAK_REALM,
  clientId: (window as any)._env_?.KEYCLOAK_CLIENT_ID
};

const kc: Keycloak.KeycloakInstance = Keycloak(initOptions);

kc.init({ onLoad: "login-required" })
  .success(() => {
    ReactDOM.render(<App />, document.getElementById("root"));
  })
  .error(error => console.log(error));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
