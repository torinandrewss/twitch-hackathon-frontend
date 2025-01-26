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

  // Calculate the minimum and maximum sentiment values
  const minSentiment = Math.min(
    ...intervals.map((interval) => interval.averageSentiment)
  );
  const maxSentiment = Math.max(
    ...intervals.map((interval) => interval.averageSentiment)
  );

  // Prepare chart data
  const labels = intervals.map(
    (interval) => `${interval.start}s - ${interval.end}s`
  );
  const data = intervals.map((interval) => interval.totalMessages);
  const backgroundColors = intervals.map((interval) =>
    getColorForSentiment(interval.averageSentiment, minSentiment, maxSentiment)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Messages',
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
        borderRadius: 8, // Rounded corners for bars
        borderColor: 'rgba(0, 0, 0, 0.2)', // Subtle border for contrast
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend as it is self-explanatory
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for tooltips
        titleFont: { size: 14, weight: 'bold', family: 'Arial' }, // Custom font for tooltip title
        bodyFont: { size: 12, family: 'Arial' }, // Custom font for tooltip body
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
          font: { size: 16, weight: 'bold', family: 'Arial' },
          color: 'rgb(0, 0, 0)',
        },
        ticks: {
          font: { size: 12, family: 'Arial' },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Messages',
          font: { size: 16, weight: 'bold', family: 'Arial' }, // Styled axis title
          color: 'rgb(0, 0, 0)',
        },
        ticks: {
          font: { size: 12, family: 'Arial' }, // Styled tick labels
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Light grid lines for y-axis
          borderDash: [5, 5], // Dashed lines for visual distinction
        },
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 10,
        right: 10,
      }, // Add padding to the chart area
    },
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        background: '#f8f9fa', // Subtle background for chart container
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a shadow for a card-like appearance
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChatBarChart;
