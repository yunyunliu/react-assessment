import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const ScatterPlot = ({ parameter }) => {
    const chartContainer = useRef(null);
    // format data in {x,y} format for scatter plot
    const formatChartData = chartData => {
        const formatted = chartData.map(current => {
            return { x: current.date.local, y: current.value };
        });
        return formatted;
    };
    // get all unique dates from dataset to use as labels in chart
    const getLabels = chartData => {
        const labels = [];
        chartData.forEach(current => {
            const timestamp = current.date.utc;
            const date = timestamp.split('T')[0]; // date portion of timestamp without time
            if (!labels.includes(date)) {
                labels.push(date);
            }
        });
        return labels;
    };

    useEffect(() => {
        // get measurement data from api
        fetch('https://docs.openaq.org/v1/measurements?country=US&location=Troost&parameter=pm10')
            .then(res => res.json())
            .then(result => {
                const data = result.results // data from api
                // data and options for chart
                const chartConfigs = {
                    type: 'scatter',
                    data: {
                        datasets: [
                            {
                                label: "Parameter: " + parameter.toUpperCase(),
                                data: formatChartData(data),
                                backgroundColor: 'rgb(255, 99, 132)'
                            }
                        ]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                labels: getLabels(data),
                                time: { unit: 'day' },
                                title: { display: true, text: 'Date' }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: parameter.toUpperCase()
                                },
                                ticks: { beginAtZero: true }
                            }
                        }
                    }
                };
                if (chartContainer && chartContainer.current) {
                    // create chart
                    const newChartInstance = new Chart(chartContainer.current, chartConfigs);
                    newChartInstance.update();
                }
            });
    }, []);

    return (
        <div>
            <canvas ref={chartContainer}/>
        </div>
    );

}

export default ScatterPlot
