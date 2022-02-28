import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';


class LineGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "scatter",
            data: {
                //Bring in data
                datasets: [
                    {
                        label: "Parameter: PM10",
                        data: [{x: "2022-02-27T16:00:00-06:00", y: 21}, {x: "2022-02-27T15:00:00-06:00", y: 27}, {x: "2022-02-27T14:00:00-06:00", y: 17}],
                        backgroundColor: 'rgb(255, 99, 132)'
                    }
                ]
            },
            options: {
                //Customize chart options
                scales: {
                    x: {
                        type: 'time',
                        labels: ["2022-02-27T16:00:00-06:00", "2022-02-26T23:00:00-06:00", "2022-02-25T23:00:00-06:00", "2022-02-24T23:00:00-06:00", "2022-02-23T23:00:00-06:00"],
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'PM10'
                        }

                    }

                }
            }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default LineGraph
