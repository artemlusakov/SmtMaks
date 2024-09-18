  import React from 'react';
  import ReactApexChart from "react-apexcharts";

  interface ErrorCodesColumnProps {
    errorCodes: Record<string, { count: number; description: string }>;
  }

  const ErrorCodesColumn: React.FC<ErrorCodesColumnProps> = ({ errorCodes }) => {
    const chartData = {
      options: {
        xaxis: {
          categories: Object.keys(errorCodes),
          labels: {
            rotate: -90,
            rotateAlways: true,
            style: {
              fontSize: '9px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
          },
          },
        },
        yaxis: {
          title: {
            text: 'Количество',
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#008FFB'],
      },
      series: [{
        name: 'Количество',
        data: Object.values(errorCodes).map(({ count }) => count),
      }],
    };

    return (
      <div style={{ marginTop: '20px' }}>
        <ReactApexChart 
          options={chartData.options} 
          series={chartData.series} 
          type="bar" 
          height={400}
        />
      </div>
    );
  };

  export default ErrorCodesColumn;
