import React, { useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';

interface Props {
    warningCount: number;
    filteredCount: number;
    labels: string[];
}

const DonatsWarning: React.FC<Props> = ({ warningCount, filteredCount, labels }) => {
    useEffect(() => {
        // Этот эффект будет срабатывать при изменении warningCount или filteredCount
        console.log('Warning count or Filtered count changed');
    }, [warningCount, filteredCount]);

    const chartOptions: any = useMemo(() => ({
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
        pieChart: { // Дополнительные настройки для кругового графика
            customScale: 1.1 // Увеличивает масштаб графика на 10%
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
    }), [labels]);

    const chartSeries = useMemo(() => [
        warningCount,
        Math.max(0, filteredCount)
    ], [warningCount, filteredCount]);

    return (
        <div>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                height={250}
            />
        </div>
    );
};

export default DonatsWarning;
