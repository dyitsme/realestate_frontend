import { CategoryScale, Chart } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import SkeletonElement from './SkeletonElement';

Chart.register(CategoryScale);

const BarChart = ({ chartData, chartLabels, label, dataLoading }) => {
  // Create an array of objects with labels and data
  const combinedData = chartLabels.map((chartLabel, index) => ({
    label: chartLabel,
    data: chartData[index],
  }));

  // Sort the combined data in descending order based on the data value
  combinedData.sort((a, b) => b.data - a.data);

  // Extract sorted labels and data
  const sortedLabels = combinedData.map(item => item.label);
  const sortedData = combinedData.map(item => item.data);

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 0,
        backgroundColor: (context) => {
          const { chart, dataset, dataIndex } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null; // Prevent access if chartArea is not available
          }
          return getGradientBackground(ctx, chartArea, dataset.data[dataIndex]);
        },
        borderColor: (context) => {
          const { chart, dataset, dataIndex } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null; // Prevent access if chartArea is not available
          }
          return getGradientBorder(ctx, chartArea, dataset.data[dataIndex]);
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        display: false
      },
      title: {
        display: true,
        text: label, // Use the label prop here
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 7,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 8,
          },
        },
      },
    },
  };

  if (dataLoading) {
    return (
      <SkeletonElement height={"h-32"}/>
    )
  }

  return (
    <div>
      <Bar
        options={options}
        data={{
          labels: sortedLabels,
          datasets: [
            {
              label: label,
              data: sortedData,
            },
          ],
        }}
      />
    </div>
  );
};

function getGradientBackground(ctx, chartArea, value) {
  const { top, bottom } = chartArea;
  const gradient = ctx.createLinearGradient(0, bottom, 0, top);

  if (value >= 0) {
    gradient.addColorStop(0, '#4ADE80'); // Green
    gradient.addColorStop(1, '#4ADE80');
  } else {
    gradient.addColorStop(0, '#F87171'); // Red
    gradient.addColorStop(1, '#F87171');
  }

  return gradient;
}

function getGradientBorder(ctx, chartArea, value) {
  const { top, bottom } = chartArea;
  const gradient = ctx.createLinearGradient(0, bottom, 0, top);

  if (value >= 0) {
    gradient.addColorStop(0, '#BBF7D0'); // Light Green
    gradient.addColorStop(1, '#BBF7D0');
  } else {
    gradient.addColorStop(0, '#FECACA'); // Light Red
    gradient.addColorStop(1, '#FECACA');
  }

  return gradient;
}

export default BarChart;
