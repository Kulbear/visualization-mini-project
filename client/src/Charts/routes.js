import React from 'react';
import { Redirect } from 'react-router-dom';

import Charts from '.';
import { LineChart, ScatterChart } from './components';
import RadarChart from './RadarChart'

export default [
  {
    path: '/charts',
    component: Charts,
    routes: [
      {
        path: '/charts',
        exact: true,
        component: () => <Redirect replace to='/charts/radar' />
      },
      {
        path: '/charts/radar',
        component: RadarChart,
        tab: 'RadarChart'
      },
      {
        path: '/charts/line',
        component: LineChart,
        tab: 'LineChart'
      },
      {
        path: '/charts/scatter',
        component: ScatterChart,
        tab: 'ScatterChart'
      },
    ]
  }
];
