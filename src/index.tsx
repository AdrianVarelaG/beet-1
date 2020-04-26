import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Keycloak from "keycloak-js";

import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import ApolloClient from "apollo-client";

import * as serviceWorker from "./serviceWorker";

let initOptions: Keycloak.KeycloakConfig = {
  url: (window as any)._env_?.KEYCLOAK_URL,
  realm: (window as any)._env_?.KEYCLOAK_REALM,
  clientId: (window as any)._env_?.KEYCLOAK_CLIENT_ID,
};

const kc = Keycloak(initOptions);

kc.init({ onLoad: "login-required" })
  .then(() => {
    const authLink = setContext(async (_, { headers }) => {
      try {
        await kc.updateToken(5);
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${kc.token}`,
          },
        };
      } catch (error) {
        kc.logout();
        return;
      }
    });

    const link = createUploadLink({
      uri: (window as any)._env_?.BACKEND_URL,
    });
    const cache = new InMemoryCache();
    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        authLink,
        link,
      ]),
    });

    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      document.getElementById("root")
    );
  })
  .catch((error) => {
    console.log(error);
  });

//.error(error => console.log(error));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
