import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Home from "./home";
import chartRoutes from "./Charts/routes";
import tableRoutes from "./Tables/routes";

import "./css/reset.css";
import "./css/react-router-tabs.css";
import "./css/styles.css";

const App = () => (
  <BrowserRouter>
    <div>
      <header>
        <ul className="nav-list">
          <li className="nav-list-item">
            <NavLink exact className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink className="nav-link" to="/charts">
              Charts
            </NavLink>
          </li>
        </ul>
      </header>

      <main className="container">
        <div className="row">
          <div className="central">
            <Switch className="central">
              <Route exact path="/" component={Home} />
              {RoutesWithSubRoutes(chartRoutes)}
            </Switch>
          </div>
        </div>
      </main>
    </div>
  </BrowserRouter>
);

/**
 * Render our Routes from a central config, passing each routes' nested routes as as its own `routes` prop.
 * See: https://reacttraining.com/react-router/web/example/route-config
 * @param {Object[]} routes
 * @returns {Object[]} Array of <Routes />
 */
const RoutesWithSubRoutes = routes =>
  routes.map((route, i) => (
    <Route
      key={i}
      exact={route.exact || false}
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  ));

render(<App />, document.getElementById("root"));
