import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ freqMap }) => {
  // Extract labels and data from freqMap
  const labels = Object.keys(freqMap).map((key) => `Bin ${key}`);
  const data = Object.values(freqMap);

  // Chart.js data configuration
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
    <div
      style={{
        width: '100%',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '30px',
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
