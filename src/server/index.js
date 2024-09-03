import ReactDOM from "react-dom/server";
import * as React from "react";
import express from "express";
import cors from "cors";
import serialize from "serialize-javascript";
import { matchPath } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

import App from "../shared/App";
import routes from "../shared/routes";

const app = express();

app.use(cors());
app.use(express.static("dist"));

app.get("*", (req, res, next) => {
  const activeRoute =
    routes.find((route) => matchPath(route.path, req.url)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve(); // undefined

  promise
    .then((data) => {
      const markup = ReactDOM.renderToString(
        <StaticRouter location={req.url}>
          <App serverData={data} />
        </StaticRouter>
      );

      res.send(`
      <!DOCTYPE html>
      <html>
          <head>
              <title>SSR with React Router</title>
              <script src="/bundle.js" defer></script>    
              <link href="/main.css" rel="stylesheet">
              <script>
                window.__INITIAL_DATA__ = ${serialize(data)}
              </script>
          </head>

          <body>
              <div id="app">${markup}</div>
          </body>
      </html>
      `);
    })
    .catch(next);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
