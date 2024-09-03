import * as React from "react";
import { Route, Routes } from "react-router-dom";

import "./styles.css";
import ColorfulBorder from "./ColorfulBorder";
import NavBar from "./NavBar";
import NoMatch from "./NoMatch";
import routes from "./routes";

export default function App({ serverData = null }) {
  return (
    <React.Fragment>
      <ColorfulBorder />
      <div className="container">
        <NavBar />
        <Routes>
          {routes.map(({ path, fetchInitialData, component: C }) => {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <C data={serverData} fetchInitialData={fetchInitialData} />
                }
              />
            );
          })}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}
