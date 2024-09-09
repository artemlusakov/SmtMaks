import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import s from './CM421Item.module.css'
import DonutsDetails from '../../Donats/Donats'

// Интерфейс для описания структуры записи о работе
interface WorkRecord {
  start: string;
  end: string;
}

export default function CM421ItemOperate() {
  // Состояние для хранения общего количества PCB
  const [pcbCount, setPcbCount] = useState<number>(0);
  
  // Состояние для хранения количества выполненных задач
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  
  // Состояние для хранения целевого количества деталей, введенного пользователем
  const [targetCount, setTargetCount] = useState<string>('');

  // Константа для текста плейсхолдера в инпуте
  const TARGET_COUNT_PLACEHOLDER = 'Введите количество деталей';

  // Хук useEffect для асинхронного получения данных при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загрузка данных из Operate.json
        const response = await fetch('/Operate.json');
        const data: { datetime: string; message: string }[] = await response.json();

        if (Array.isArray(data) && data.length >= 2) {
          // Подсчет количества PCB и выполненных задач
          const pcbCount = data.filter(item => item.message.includes('[LMEvent::RID_EVENT_PCB]')).length;
          setPcbCount(pcbCount);
          setCompletedTasks(pcbCount); // Предполагаем, что каждая запись с PCB Count является завершенной задачей
        } else {
          console.error('Некорректные данные в Operate.json');
          // Обнуляем состояния при некорректных данных
          setPcbCount(0);
          setCompletedTasks(0);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        // Обнуляем состояния при ошибке загрузки
        setPcbCount(0);
        setCompletedTasks(0);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект выполняется только при монтировании компонента

  // Функция для получения целевого значения (введенное пользователем или общее количество PCB)
  const getTargetValue = () => {
    return targetCount ? parseInt(targetCount, 10) : pcbCount;
  };

  // Функция для расчета и форматирования процента выполнения
  const calculatePercentage = (): string => {
    const targetValue = getTargetValue();
    if (targetValue === 0) {
      return 'Недостаточно данных'; // Возвращаем сообщение при делении на ноль
    }
    const percentage = (completedTasks / targetValue) * 100;
    return `${percentage.toFixed(2)}%`; // Округляем до двух знаков после запятой
  };

  return (
    <div>
      <div className={s.ItemError__Content}>
        <h3>Процент выполненных задач:</h3>
        
        {/* Компонент диаграммы с переданными пропсами */}
        <DonutsDetails completedTasks={completedTasks} targetCount={getTargetValue()} />
        

        {/* Инпут для ввода целевого количества деталей */}
        <input
          type="number"
          value={targetCount}
          onChange={(e) => setTargetCount(e.target.value)}
          placeholder={TARGET_COUNT_PLACEHOLDER}
        />

        {/* Отображение рассчитанного процента выполнения */}
        <p>Процент выполнения: {calculatePercentage()}</p>
      </div>
    </div>
  );
}
  