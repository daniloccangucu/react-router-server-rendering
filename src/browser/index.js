import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "../shared/App";

hydrateRoot(
  document.getElementById("app"),
  <BrowserRouter>
    <App serverData={window.__INITIAL_DATA__} />
  </BrowserRouter>
);
