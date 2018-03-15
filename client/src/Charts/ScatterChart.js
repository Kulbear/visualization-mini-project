import React, { Component } from 'react';
import { includes } from 'lodash';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';

import './chart.css'

const schema = [
  {name: 'date', index: 0, text: 'Date'},
  {name: 'AQIindex', index: 1, text: 'AQI'},
  {name: 'PM25', index: 2, text: 'PM2.5'},
  {name: 'PM10', index: 3, text: 'PM10'},
  {name: 'CO', index: 4, text: 'CO'},
  {name: 'NO2', index: 5, text: 'NO2'},
  {name: 'SO2', index: 6, text: 'SO2'}
];


const itemStyle = {
  normal: {
      opacity: 0.8,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
  }
};

// Whenever add a new city, build a serie and push to options.series
// need both name and data
const buildSerie = (city, data, ct) => {
    return {
      name: city,
      type: 'scatter',
      itemStyle: itemStyle,
      data: data
  }
}

const getOpions = () => {
  return {
    backgroundColor: '#fff',
    color: ['#f9f9f9', '#fec42c', '#80F1BE', '#3463cc'],
    legend: {
        y: 'top',
        data: [],
        textStyle: {
            color: '#000',
            fontSize: 16
        }
    },
    grid: {
        x: '10%',
        x2: 150,
        y: '18%',
        y2: '10%'
    },
    tooltip: {
        padding: 10,
        backgroundColor: '#000',
        borderColor: '#000',
        borderWidth: 1,
        formatter: function (obj) {
            var value = obj.value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + obj.seriesName + ' ' + value[0] + ': '
                + value[7]
                + '</div>'
                + schema[1].text + '：' + value[1] + '<br>'
                + schema[2].text + '：' + value[2] + '<br>'
                + schema[3].text + '：' + value[3] + '<br>'
                + schema[4].text + '：' + value[4] + '<br>'
                + schema[5].text + '：' + value[5] + '<br>'
                + schema[6].text + '：' + value[6] + '<br>';
        }
    },
    xAxis: {
        type: 'value',
        name: 'Date',
        nameGap: 16,
        nameTextStyle: {
            color: '#000',
            fontSize: 14
        },
        max: 31,
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#000'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: 'AQI',
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
            color: '#000',
            fontSize: 16
        },
        axisLine: {
            lineStyle: {
                color: '#000'
            }
        },
        splitLine: {
            show: false
        }
    },
    visualMap: [
        {
            left: 'right',
            top: '10%',
            dimension: 2,
            min: 0,
            max: 250,
            itemWidth: 30,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['Shape Size: PM2.5'],
            textGap: 30,
            textStyle: {
                color: '#000'
            },
            inRange: {
                symbolSize: [10, 70]
            },
            outOfRange: {
                symbolSize: [10, 70],
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['#000']
                },
                outOfRange: {
                    color: ['#aaa']
                }
            }
        },
        {
            left: 'right',
            bottom: '5%',
            dimension: 6,
            min: 0,
            max: 50,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['Saturation: CO2'],
            textGap: 30,
            textStyle: {
                color: '#000'
            },
            inRange: {
                colorLightness: [1, 0.5]
            },
            outOfRange: {
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['#000']
                },
                outOfRange: {
                    color: ['#aaa']
                }
            }
        }
    ],
    series: []
  }
};

class ScatterChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            city: 'Beijing',
            year: '2011',
            month: '1',
            chartOption: getOpions(),
            ct: 0
        };
    }

    generateCity = () => {
        const cities = ['Beijing', 'Shanghai', 'Fujian', 'Guangzhou', 'Hainan', 'Hangzhou', 'Shijiazhuang', 'Tianjin']
        const selections = cities.map((e) => {
            return <option value={e} key={e}>{e}</option>
        })
        return selections
    }

    generateMonth = () => {
        const months = [1,2,3,4,5,6,7,8,9,10,11,12]
        const selections = months.map((e) => {
            return <option value={e} key={e}>{e}</option>
        })
        return selections
    }

    generateYear = () => {
        const years = [2011, 2012, 2013]
        const selections = years.map((e) => {
            return <option value={e} key={e}>{e}</option>
        })
        return selections
    }

    handleYearChange = (e) => {
        this.setState({
            year: e.target.value,
        });
        console.log(e.target.value);
    }

    handleMonthChange = (e) => {
        this.setState({
            month: e.target.value,
        });
        console.log(e.target.value);
    }

    handleCityChange = (e) => {
        this.setState({
            city: e.target.value,
        });
        console.log(e.target.value);
    }

    handleClearAll = (e) => {
        e.preventDefault()
        this.setState({
            chartOption: getOpions(),
            ct: 0
        })
        this.forceUpdate()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.get('http://localhost:5000/api/aqi', {
            params: {
                city: this.state.city,
                year: this.state.year,
                month: this.state.month,
                ctype: 'scatter'
            }
        })
        .then(response => response.data)
        .then(data => {
            if (!data.city) {
                throw Error()
            }
            const thisOption = {...this.state.chartOption};
            
            if (thisOption.legend.data.length > 3) {
              thisOption.legend.data.shift()
              thisOption.series.shift()
            }

            if (!includes(thisOption.legend.data, data.city)) {
                thisOption.legend.data.push(`${data.city}`)
                thisOption.series.push(buildSerie(data.city, data.data, this.state.ct))
            }         

            this.setState({
                loaded: true,
                chartOption: thisOption,
                ct: this.state.ct + 1
            });
        })
        .catch(error => {
            alert('No data for this city at the selected period!');
        });
    }

    render() {
        return (
        <div className='chart-container'>
            <div className='chart-form'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        City:
                        <select name="city" onChange={this.handleCityChange}>
                            {this.generateCity()}
                        </select>
                    </label>
                    <br />
                    <label>
                        Year:
                        <select name="year" onChange={this.handleYearChange}>
                            {this.generateYear()}
                        </select>
                    </label>
                    <br />
                    <label>
                        Month:
                        <select name="month" onChange={this.handleMonthChange}>
                            {this.generateMonth()}
                        </select>
                    </label>
                    <br />
                    <input type="button" value="Clear All" onClick={this.handleClearAll}/>
                    <input type="submit" value="Add City!" />
                </form>
            </div>

            <div className='chart'>
                <ReactEcharts className='echart' ref='echartsInstance' option={this.state.chartOption} />
            </div>
        </div>
        );
    }
}

export default ScatterChart;
  