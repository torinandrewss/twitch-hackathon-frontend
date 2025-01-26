import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  processChartData,
  getColorForSentiment,
} from '../../utils/chartHelpers';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/**
 * Bar Chart Component
 * @param {Object} props
 * @param {Object} props.chatData - The chat data containing `map` and `freqMap`
 */
const ChatBarChart = ({ chatData }) => {
  const intervals = processChartData(chatData);

  // Prepare chart data
  const labels = intervals.map(
    (interval) => `${interval.start}s - ${interval.end}s`
  );
  const data = intervals.map((interval) => interval.totalMessages);
  const backgroundColors = intervals.map((interval) =>
    getColorForSentiment(interval.averageSentiment)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Messages',
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const interval = intervals[tooltipItem.dataIndex];
            return [
              `Total Messages: ${interval.totalMessages}`,
              `Average Sentiment: ${interval.averageSentiment.toFixed(2)}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Interval',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Messages',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChatBarChart;
