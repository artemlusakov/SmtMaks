import React, { useEffect, useState } from 'react';
import s from './CM421Item.module.css'
import DonutsDetails from '../../../../Components/Graphs/Donats/Donats'
import { useCompletedTasks } from '../../../../Stors/Stor';


export default function CM421ItemOperate() {

  const [targetCount, setTargetCount] = useState<string>('');
  const { completedTasks, fetchCompletedTasks } = useCompletedTasks();

  React.useEffect(() => {
    fetchCompletedTasks();
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
