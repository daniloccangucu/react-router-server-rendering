import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "../shared/App";

const container = document.getElementById("app");
hydrateRoot(container, <App />);
