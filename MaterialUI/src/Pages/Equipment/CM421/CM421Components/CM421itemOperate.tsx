import React, { useEffect, useState } from 'react';
import s from './CM421Item.module.css'
import DonutsDetails from '../../../../Components/Graphs/Donats/Donats'

interface DataItem {
  datetime: string;
  message: string;
}

export default function CM421ItemOperate() {
  
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<string>('');

  useEffect(() => {
    fetch('/Operate.json')
      .then(response => response.json())
      .then((data: DataItem[]) => {
        if (Array.isArray(data)) {
          const pcbRecords = data.filter(item => item.message.includes('[LMEvent::RID_EVENT_PCB]'));
          setCompletedTasks(pcbRecords.length);
        } else {
          console.error('Received data is not an array');
          setCompletedTasks(0);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getTargetValue = () => {
    return targetCount ? parseInt(targetCount, 10) : completedTasks;
  };

  const calculatePercentage = (): string => {
    const targetValue = getTargetValue();
    if (targetValue === 0) {
      return 'Недостаточно данных';
    }
    const percentage = (completedTasks / targetValue) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    setTargetCount(inputValue);
  };

  return (
    <div className={s.ItemBox}>
      <h3>Процент выполненных задач:</h3>
      
      <DonutsDetails completedTasks={completedTasks} targetCount={getTargetValue()} />

      <input
        type="number"
        value={targetCount}
        onChange={handleInputChange}
        placeholder='Введите количество плат'
      />

      <p>Процент выполнения: {calculatePercentage()}</p>

      <p>Количество плат: {completedTasks}</p>
    </div>
  );
}
