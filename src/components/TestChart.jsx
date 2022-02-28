import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
const TestChart = ({ formatDate, getTime }) => {
  const [pm10, setPm10] = useState(null);

  const findDates = () => {

  }

  const data = {
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'date',
        data: pm10
      }
    ]
  };

  const options = {
    scales: {
      xAxis: [{
        type: 'time',
        time: {
          unit: 'day'
        }
      }]
    }
  }

  return (
    // <Scatter data={data} options={options} />
  );
};

export default TestChart;
