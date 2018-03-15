import React from "react";
import { Link } from "react-router-dom";

export default props => (
  <div>
    <h2>Welcome to our air quality demo station!</h2>
    <p>
      You can view the air quality data of China mainland here by table mode and
      chart mode!
    </p>
    <p>
      <Link className="inline-link" to="/charts">
        Charts
      </Link>{" "}
    </p>
    <p>
      <Link className="inline-link" to="/tables">
        Tables
      </Link>{" "}
    </p>
  </div>
);
