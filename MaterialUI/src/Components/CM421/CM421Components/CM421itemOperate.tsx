import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface WorkRecord {
  start: string;
  end: string;
}

export default function CM421ItemOperate() {
  const [workRecord, setWorkRecord] = useState<WorkRecord>({
    start: "",
    end: ""
  });

  const [pcbCount, setPcbCount] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<string>('');

  const START_DATE = 'Начало работы:';
  const END_DATE = 'Конец работы:';
  const TARGET_COUNT_PLACEHOLDER = 'Введите количество деталей';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Operate.json');
        const data: { datetime: string; message: string }[] = await response.json();

        if (Array.isArray(data) && data.length >= 2) {
          setWorkRecord({
            start: data[0].datetime,
            end: data[data.length - 1].datetime
          });

          // Подсчет записей с PCB Count
          const pcbCount = data.filter(item => item.message.includes('[LMEvent::RID_EVENT_PCB]')).length;
          setPcbCount(pcbCount);

          // Предположим, что каждая запись с PCB Count является завершенной задачей
          setCompletedTasks(pcbCount);
        } else {
          console.error('Некорректные данные в Operate.json');
          setWorkRecord({ start: "", end: "" });
          setPcbCount(0);
          setCompletedTasks(0);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setWorkRecord({ start: "", end: "" });
          setPcbCount(0);
          setCompletedTasks(0);
      }
    };

    fetchData();
  }, []);

  const { start, end } = workRecord;

  const getTargetValue = () => {
    return targetCount ? parseInt(targetCount, 10) : pcbCount;
  };

  const chartOptions = {
    labels: ['Выполненные задачи', 'Остальные задачи'],
    colors: ['#34C759', '#FF0000'],
    plotOptions: {
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
    Math.max(0, getTargetValue() - completedTasks)
  ];

  return (
    <div>
      <h3>{START_DATE} {start}</h3>
      <h3>{END_DATE} {end}</h3>
      
      <h3>Количество записей с PCB Count:</h3>
      <p>{pcbCount}</p>

      <h3>Целевое количество деталей:</h3>
      <input
        type="number"
        value={targetCount}
        onChange={(e) => setTargetCount(e.target.value)}
        placeholder={TARGET_COUNT_PLACEHOLDER}
      />

      <h3>Процент выполненных задач:</h3>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={350}
      />
      
      <p>Процент выполнения: {(completedTasks / getTargetValue()) * 100}%</p>
    </div>
  );
}
