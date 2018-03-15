import React from "react";
import { Redirect } from "react-router-dom";

import Tables from ".";
import { CityTable } from "./components";

export default [
  {
    path: "/tables",
    component: Tables,
    routes: [
      {
        path: "/tables",
        exact: true,
        component: () => <Redirect replace to="/tables/city" />
      },
      {
        path: "/tables/city",
        component: CityTable,
        tab: "CityTable"
      }
    ]
  }
];
