import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import s from './CM421Item.module.css'
import DonutChart from '../../Donats/Donats'

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

      <div className={s.ItemError__Content}>
        <h3>Процент выполненных задач:</h3>
        <DonutChart completedTasks={completedTasks} targetCount={getTargetValue()} />
        
        <p>Процент выполнения: {(completedTasks / getTargetValue()) * 100}%</p>
      </div>
    </div>
  );
}
