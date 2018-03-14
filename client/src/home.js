import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div>
    <h2>Welcome to our air quality demo station!</h2>
    <p>You can view the air quality data of China mainland here by table mode and chart mode!</p>
    <p><Link className="inline-link" to="/charts">Charts</Link> example shows an implementation using a central route config (server-rendered apps might use this).</p>
    <p><Link className="inline-link" to="/tables">Tables</Link> example shows a straight-forward implementation with nested routes.</p>
  </div>
);
