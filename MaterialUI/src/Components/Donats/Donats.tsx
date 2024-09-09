import React from 'react';
import Chart from 'react-apexcharts';

// Определение интерфейса пропсов компонента
interface DonutsDetailsProps {
  completedTasks: number; // Количество выполненных задач
  targetCount: number; // Целевой счетчик задач
}

/**
 * Компонент для отображения графика с информацией о выполненных и не выполненных задачах
 */
export default function DonutsDetails({ completedTasks, targetCount }: DonutsDetailsProps): JSX.Element {
  // Определение опций графика
  const chartOptions = {
    labels: ['Сделано деталей', 'Осталось сделать деталей'], // Подписи для секторов графика
    colors: ['#34C759', '#FF0000'], // Цвета для секторов: зеленый для выполненных, красный для не выполненных
    plotOptions: {
      pie: { // Общие настройки для кругового графика
        donut: { // Настройки для графика пончика
          size: '45%' // Размер графика пончика в 45% от ширины контейнера
        }
      },
      pieChart: { // Дополнительные настройки для кругового графика
        customScale: 1.1 // Увеличивает масштаб графика на 10%
      }
    },
    legend: { // Настройки легенды
      show: false // Скрывает легенду
    },
    responsive: [{ // Настройки для адаптивности при изменении размера экрана
      breakpoint: 480,
      options: {
        chart: { // Настройки для маленьких экранов
          width: 200 // Уменьшает ширину графика до 200 пикселей
        },
        legend: { // Настройки легенды для маленьких экранов
          position: 'bottom' // Перемещает легенду вниз
        }
      }
    }],
    chart: { // Общие настройки для графика
      events: { // Обработчики событий для элементов графика
        dataPointMouseEnter: function(event: any): void { // Изменяет курсор при наведении на точку данных
          event.target.style.cursor = "pointer";
        },
        dataPointMouseLeave: function(event: any): void { // Возвращается стандартный курсор при уходе от точки данных
          event.target.style.cursor = "default";
        }
      },
      toolbar: { // Настройки инструментной панели
        show: false // Скрывает инструментную панель
      }
    }
  };

  // Определение данных для серии графика
  const chartSeries = [
    completedTasks, // Количество выполненных задач
    Math.max(0, targetCount - completedTasks) // Максимальное из нуля и разница между целевым количеством и выполненными задачами
  ];

  return (
    // Компонент Chart от react-apexcharts
    <Chart
      options={chartOptions} // Передаем объект с опциями графика
      series={chartSeries} // Передаем массив с данными для графика
      type="donut" // Тип графика - донут
      height={250} // Высота графика в 250 пикселей
    />
  );
}
