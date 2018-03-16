import React, { Component } from "react";
import { includes } from "lodash";
import axios from "axios";
import ReactTable from "react-table";

import "../../node_modules/react-table/react-table.css";
import "./table.css";

class CityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Beijing",
      year: "2011",
      month: "1",
      data: null
    };
  }

  buildData = data => {
    let ct = 0;
    return data.map(e => {
      ct = ct + 1;
      return {
        AQI: e[1],
        PM25: e[2],
        PM10: e[3],
        CO: e[4],
        NO2: e[5],
        SO2: e[6],
        quality: e[7],
        date: ct
      };
    });
  };

  generateCity = () => {
    const cities = [
      "Beijing",
      "Shanghai",
      "Fujian",
      "Guangzhou",
      "Hainan",
      "Hangzhou",
      "Shijiazhuang",
      "Tianjin"
    ];
    const selections = cities.map(e => {
      return (
        <option value={e} key={e}>
          {e}
        </option>
      );
    });
    return selections;
  };

  handleCityChange = e => {
    this.setState({
      city: e.target.value
    });
    console.log(e.target.value);
  };

  generateMonth = () => {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const selections = months.map(e => {
      return (
        <option value={e} key={e}>
          {e}
        </option>
      );
    });
    return selections;
  };

  handleMonthChange = e => {
    this.setState({
      month: e.target.value
    });
    console.log(e.target.value);
  };

  generateYear = () => {
    const years = [2011, 2012, 2013];
    const selections = years.map(e => {
      return (
        <option value={e} key={e}>
          {e}
        </option>
      );
    });
    return selections;
  };

  handleYearChange = e => {
    this.setState({
      year: e.target.value
    });
    console.log(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .get("http://localhost:5000/api/aqi", {
        params: {
          city: this.state.city,
          year: this.state.year,
          month: this.state.month,
          ctype: "scatter"
        }
      })
      .then(response => response.data)
      .then(data => {
        console.log("DATA:", data);
        if (!data.data) {
          throw Error();
        }
        this.setState({
          data: data.data
        });
      })
      .catch(error => {
        console.log(error);
        alert("No data for this city!");
      });
  };

  render() {
    return (
      <div className="chart-container">
        <div className="chart-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>City:</label>
              <select
                className="form-control"
                name="city"
                onChange={this.handleCityChange}
              >
                {this.generateCity()}
              </select>
            </div>
            <div className="form-group">
              <label>Year:</label>
              <select
                className="form-control"
                name="year"
                onChange={this.handleYearChange}
              >
                {this.generateYear()}
              </select>
            </div>
            <div className="form-group">
              <label>Month:</label>
              <select
                className="form-control"
                name="month"
                onChange={this.handleMonthChange}
              >
                {this.generateMonth()}
              </select>
            </div>
            <p>
              <input
                className="btn btn-success"
                type="submit"
                value="Show City Data"
              />
            </p>
          </form>
        </div>
        <div className="table-container">
          {this.state.data ? (
            <ReactTable
              className="table"
              data={this.buildData(this.state.data)}
              columns={[
                {
                  Header: "Day",
                  accessor: "date"
                },
                {
                  Header: "AQI",
                  accessor: "AQI"
                },
                {
                  Header: "PM2.5",
                  accessor: "PM25"
                },
                {
                  Header: "PM10",
                  accessor: "PM10"
                },
                {
                  Header: "CO",
                  accessor: "CO"
                },
                {
                  Header: "NO2",
                  accessor: "NO2"
                },
                {
                  Header: "SO2",
                  accessor: "SO2"
                },
                {
                  Header: "Quality",
                  accessor: "quality"
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default CityTable;
