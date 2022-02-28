import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const LineGraph = ({ parameter }) => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [xAxisLabels, setXAxisLabels] = useState(null);
    const [formattedData, setFormattedData] = useState(null);
    // const myChartRef = this.chartRef.current.getContext("2d");


    useEffect(() => {
        // get measurement data from api
        fetch('https://docs.openaq.org/v1/measurements?country=US&location=Troost&parameter=pm10')
            .then(res => res.json())
            .then(result => {
                const data = result.results;
                setRawData(data);
                const formatted = data.map(current => {
                    return { x: current.date.local, y: current.value };
                });
                setFormattedData(formatted);
                const labels = [];
                data.forEach(current => {
                    const timestamp = current.date.utc;
                    const date = timestamp.split('T')[0]; // date portion of timestamp without time
                    if (!labels.includes(date)) {
                        labels.push(date);
                    }
                });
                setXAxisLabels(labels);
            });
    }, []);

    // get all unique dates from dataset to use as labels in chart

     // data and options for chart
        // const chartConfigs = {
        //     type: 'scatter',
        //     data: {
        //         datasets: [
        //             {
        //                 // label: "Parameter: " + parameter.toUpperCase(),
        //                 data: formattedData,
        //                 backgroundColor: 'rgb(255, 99, 132)'
        //             }
        //         ]
        //     },
        //     options: {
        //         scales: {
        //             x: {
        //                 type: 'time',
        //                 labels: getLabels(rawData),
        //                 time: { unit: 'day' },
        //                 title: {
        //                     display: true,
        //                     text: 'Date'
        //                 }
        //             },
        //             y: {
        //                 title: {
        //                     display: true,
        //                     // text: parameter.toUpperCase()
        //                 },
        //                 ticks: { beginAtZero: true }
        //             }
        //         }
        //     }
        // }
     // create chart
    // if (chartContainer && chartContainer.current) {
    //     const newChart = new Chart(chartContainer.current, chartConfigs);
    //     setChartInstance(newChart);
    //     newChart.update();
    // }
    if (rawData) {
        return (
            <div>
                {console.log(xAxisLabels)}
                <canvas
                    id="myChart"
                    ref={chartContainer}
                />
            </div>
        );
    }
    return null;
}

export default LineGraph
