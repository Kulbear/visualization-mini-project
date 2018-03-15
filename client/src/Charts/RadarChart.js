import React, { Component } from 'react';
import { includes } from 'lodash';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';

import './chart.css'

const getRandomColor = () => {
    const colorList = []
    for (let i = 0; i < 20; i++) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        colorList.push(color);
    }
    return colorList
}

const colorList = getRandomColor()

const lineStyle = {
    normal: {
        width: 1,
        opacity: 0.5
    }
};

// Whenever add a new city, build a serie and push to options.series
// need both name and data
const buildSerie = (city, data, ct) => {
    return {
        name: city,
        type: 'radar',
        lineStyle: lineStyle,
        data: data,
        symbol: 'none',
        itemStyle: {
            normal: {
                color: colorList[ct]
            }
        },
        areaStyle: {
            normal: {
                opacity: 0.1
            }
        }
    }
}

const getOpions = () => {
    return {
        backgroundColor: '#ffffff',
        title: {
            text: 'AQI - Radar Chart',
            left: 'center',
            textStyle: {
                color: '#000'
            }
        },
        legend: {
            bottom: 5,
            data: [],
            itemGap: 20,
            textStyle: {
                color: '#000',
                fontSize: 16
            },
            selectedMode: 'multiple'
        },
        radar: {
            indicator: [
                {name: 'AQI', max: 300},
                {name: 'PM2.5', max: 250},
                {name: 'PM10', max: 300},
                {name: 'CO', max: 5},
                {name: 'NO2', max: 200},
                {name: 'SO2', max: 100}
            ],
            shape: 'circle',
            splitNumber: 5,
            name: {
                textStyle: {
                    color: '#000'
                }
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.4)',
                        'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: [
        ]
    }
    
}

class RadarChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            city: 'Beijing',
            year: '2011',
            month: '1',
            radarOption: getOpions(),
            ct: 0
        };
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
            radarOption: getOpions(),
            ct: 0
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.get('http://localhost:5000/api/aqi', {
            params: {
                city: this.state.city,
                year: this.state.year,
                month: this.state.month
            }
        })
        .then(response => response.data)
        .then(data => {
            if (!data.city) {
                throw Error()
            }
            const thisOption = {...this.state.radarOption};
            
            if (!includes(thisOption.legend.data, data.city)) {
                thisOption.legend.data.push(`${data.city}`)
                thisOption.series.push(buildSerie(data.city, data.data, this.state.ct))
            }         

            this.setState({
                loaded: true,
                radarOption: thisOption,
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
                        <input type="text" value={this.state.city} onChange={this.handleCityChange} />
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
                <ReactEcharts className='echart' ref='echartsInstance' option={this.state.radarOption} />
            </div>
        </div>
        );
    }
}

export default RadarChart;
  