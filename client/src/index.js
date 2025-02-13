import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import AdminStore from "./store/AdminStore";

export const Context = createContext(null);

const rootElement = document.getElementById("root");
export const root = createRoot(rootElement);

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      faculty: new AdminStore(),
      dept: new AdminStore(),
      group: new AdminStore(),
    }}
  >
    <App />
  </Context.Provider>,
);