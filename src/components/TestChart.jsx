import { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';

const TestChart = ({ formatDate, getTime }) => {
  const [pm10, setPm10] = useState(null);
  useEffect(() => {
    fetch('https://docs.openaq.org/v1/measurements?country=US&location=Troost&parameter=pm10')
        .then(res => res.json())
        .then(data => {
          const dataset = data.results.map(current => {
            const datapoint = {};
            const formatted = formatDate(current.date.utc) + ' ' + getTime(current.date.utc);
            datapoint[formatted] = current.value;
            return datapoint;
          });
          // const dateTime = data.results.map(current => {
          //   const dateString = current.date.utc;
          //   return formatDate(dateString) + ' ' + getTime(dateString)
          // });
          // setPm10(data)
          console.log('dataset', dataset)

        })
  }, []);

  // const data = {
  //   datasets: [
  //     {
  //       label: 'Time Series Data (PM10)',
  //       data:
  //     }

  //   ]
  // }
  return (
    <div>teststestws</div>
  );
};

export default TestChart;
