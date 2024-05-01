import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import ko from "../src/lang/locale/kor.json";
import eng from "../src/lang/locale/eng.json";

const locale = localStorage.getItem("locale") ?? "ko";
const messages = { eng: eng, ko: ko }[locale];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <IntlProvider locale={locale} messages={messages}>
    <App />
  </IntlProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
