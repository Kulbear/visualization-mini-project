import React, { Component } from "react";
import { includes } from "lodash";
import axios from "axios";
import ReactEcharts from "echarts-for-react";

import "./chart.css";

const colorList = ["#f9f9f9", "#fec42c", "#80F1BE", "#3463cc"];

const lineStyle = {
  normal: {
    width: 1,
    opacity: 0.5
  }
};

// Whenever add a new city, build a serie and push to options.series
// need both name and data
const buildSerie = (city, data) => {
  return {
    name: `${city} AQI`,
    type: "line",
    data: data.map(function(item) {
      return item[1];
    }),
    markLine: {
      silent: true,
      data: [
        {
          yAxis: 50
        },
        {
          yAxis: 100
        },
        {
          yAxis: 150
        },
        {
          yAxis: 200
        },
        {
          yAxis: 300
        }
      ]
    }
  };
};

const getOpions = (city, data) => {
  return city
    ? {
        title: {
          text: `${city} AQI`
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data
            ? data.map(function(item) {
                return item[0];
              })
            : []
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: "2010-01-01",
            endValue: "2012-12-31"
          },
          {
            type: "inside"
          }
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#096"
            },
            {
              gt: 50,
              lte: 100,
              color: "#ffde33"
            },
            {
              gt: 100,
              lte: 150,
              color: "#ff9933"
            },
            {
              gt: 150,
              lte: 200,
              color: "#cc0033"
            },
            {
              gt: 200,
              lte: 300,
              color: "#660099"
            },
            {
              gt: 300,
              color: "#7e0023"
            }
          ],
          outOfRange: {
            color: "#999"
          }
        },
        series: {}
      }
    : {};
};

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Beijing",
      chartOption: getOpions()
    };
  }

  generateCity = () => {
    const cities = ["Beijing", "Shanghai", "Shijiazhuang"];
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

  handleClearAll = e => {
    e.preventDefault();
    this.setState({
      chartOption: getOpions()
    });
    this.forceUpdate();
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .get("http://localhost:5000/api/aqi", {
        params: {
          city: this.state.city,
          ctype: "line"
        }
      })
      .then(response => response.data)
      .then(data => {
        console.log(data);
        if (!data.data) {
          throw Error();
        }

        const thisOption = getOpions(this.state.city, data.data);
        thisOption.series = buildSerie(this.state.city, data.data);

        this.setState({
          loaded: true,
          chartOption: thisOption
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
            <label>
              City:
              <select name="city" onChange={this.handleCityChange}>
                {this.generateCity()}
              </select>
            </label>
            <br />
            <input
              type="button"
              value="Clear All"
              onClick={this.handleClearAll}
            />
            <input type="submit" value="Show City Data!" />
          </form>
        </div>

        <div className="chart">
          <ReactEcharts
            className="echart"
            ref="echartsInstance"
            option={this.state.chartOption}
          />
        </div>
      </div>
    );
  }
}

export default LineChart;
