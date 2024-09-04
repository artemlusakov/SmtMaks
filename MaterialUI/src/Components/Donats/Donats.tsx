import React from 'react';
import Chart from 'react-apexcharts';

interface DonutChartProps {
  completedTasks: number;
  targetCount: number;
}

export default function DonutChart({ completedTasks, targetCount }: DonutChartProps): JSX.Element {
  const chartOptions = {
    labels: ['Сделанно деталей', 'Осталось сделать деталей'],
    colors: ['#34C759', '#FF0000'],
    plotOptions: {
      pie: {
        donut: {
          size: '50%'
        }
      },
      pieChart: {
        customScale: 1.1
      }
    },
    legend: {
      show: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    chart: {
      events: {
        dataPointMouseEnter: function(event: any): void {
          event.target.style.cursor = "pointer";
        },
        dataPointMouseLeave: function(event: any): void {
          event.target.style.cursor = "default";
        }
      },
      toolbar: {
        show: false
      }
    }
  };

  const chartSeries = [
    completedTasks,
    Math.max(0, targetCount - completedTasks)
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="donut"
      height={250}
    />
  );
}
