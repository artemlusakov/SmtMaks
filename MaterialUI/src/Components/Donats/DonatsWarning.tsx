import React from 'react';
import Chart from 'react-apexcharts';

interface ChartData {
    name: string;
    value: number;
}

interface Props {
    warningCount: number;
    filteredCount: number;
}

const DonatsWarning: React.FC<Props> = ({ warningCount, filteredCount, labels }) => {
    const chartOptions: any = {
        chart: {
            type: 'donut',
            width: 350,
            height: 300,
        },
        labels: labels,
        colors: ['#34C759', '#FF0000'],
        plotOptions: {
            pie: {
                donut: {
                    size: '45%',
                }
            }
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
        legend: {
            show: false
        },
        noData: {
            text: 'No data available',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontSize: '14px',
                fontFamily: undefined
            }
        }
    };

    const chartSeries = [
        warningCount,
        Math.max(0,filteredCount)
    ];

    return (
        <div>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                width={300}
                height={250}
            />
        </div>
    );
};

export default DonatsWarning;
