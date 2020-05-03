import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import configRouter from "./confingRouter";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {configRouter.map((route, idx) => (
          <Route key={idx} path={route.path} exact={route.exact}>
            <route.page />
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
}
