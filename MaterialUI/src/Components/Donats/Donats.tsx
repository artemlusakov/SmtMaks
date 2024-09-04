import Chart from 'react-apexcharts';

interface DonutChartProps {
  completedTasks: number;
  targetCount: number;
}

export default function DonutChart({ completedTasks, targetCount }: DonutChartProps) {
  const chartOptions = {
    labels: ['Выполненные задачи', 'Остальные задачи'],
    colors: ['#34C759', '#FF0000'],
    plotOptions: {
        pie: {
            donut: {
              size: '50%' // регулировка размера отверстия. Указывайте в % от 100% до 0 
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
    }]
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

