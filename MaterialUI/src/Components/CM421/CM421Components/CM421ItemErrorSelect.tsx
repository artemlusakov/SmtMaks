import React, { useEffect, useState } from 'react';
import s from "./CM421Item.module.css";

interface LogEntry {
  timestamp: string;
  id: string;
  level: string;
  message: string;
}

export default function CM421ItemErrorSelect() {
    const [filteredCount, setFilteredCount] = useState<number>(0); 
    const [selectedHead, setSelectedHead] = useState<string>('Head1'); // Состояние выбора Head по умолчанию Head1
    const [selectPowerPosition, setSelectPowerPosition] = useState<string>('') // Исправлено название переменной

    useEffect(() => {
        fetch('/Error.json')
          .then(response => response.json())
          .then((data: LogEntry[]) => {
  
            // Фильтруем данные, используя значения selectedHead и selectPowerPosition
            const filteredEntries = data.filter(item =>
              item.message.includes(selectedHead) && 
              (item.message.includes(selectPowerPosition) || !selectPowerPosition) &&
              item.level === 'WARNING');
            

            setFilteredCount(filteredEntries.length);
  
          })
          .catch(error => console.error('Ошибка при загрузке данных:', error));
      }, [selectedHead, selectPowerPosition]); // Добавляем selectedHead в массив зависимостей
  
      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedHead(event.target.value);
      };
      const powerPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toUpperCase();
        setSelectPowerPosition(inputValue.replace(/[^A-Z0-9\s]/g, ''));
      };

  return (
    <div className={s.ItemError__Content}>
      <h3>Количество записей, где "{selectedHead}" Fider - "{selectPowerPosition}" и статус WARNING:</h3>
      <div className={s.ItemError__Content_num}>
        {filteredCount}
      </div>
      <div>
        <select value={selectedHead} onChange={handleSelectChange}>
          <option value="Head1">Head1</option>
          <option value="Head2">Head2</option>
          <option value="Head3">Head3</option>
          <option value="Head4">Head4</option>
          <option value="Head5">Head5</option>
          <option value="Head6">Head6</option>
        </select>

        <input 
      type="text"
      value={selectPowerPosition}
      onChange={powerPositionChange}
       pattern="^[A-Z0-9\s]+$"
    />
      </div>  
    </div>
  );
}
