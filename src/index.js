import React from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/styles/main.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/client";
import { AuthContextProvider } from "./Context/AuthContext";
import { LoggingProvider, LogLevel } from "./logging/LogginProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoggingProvider
      config={{
        applicationId: "auction_app",
        environment: "production",
        logLevel: LogLevel.DEBUG,
        enableRemoteLogging: false,
        sentryDsn: 'https://ec901856500706228ccfa548e5f34df4@o4508796343287808.ingest.us.sentry.io/4508796345647104'
      }}
    >
      <ApolloProvider client={apolloClient}>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </ApolloProvider>
    </LoggingProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
