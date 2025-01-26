import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ freqMap }) => {
  const labels = Object.keys(freqMap).map((key) => `Bin ${key}`);
  const data = Object.values(freqMap);

  const chartData = {
    labels, // X-axis labels
    datasets: [
      {
        label: 'Message Frequency',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Message Frequency per Time Bin',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time Bins',
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
