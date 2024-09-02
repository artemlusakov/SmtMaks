import React, { useEffect, useState } from 'react';
import s from "./CM421ItemError.module.css";

interface LogEntry {
  timestamp: string;
  id: string;
  level: string;
  message: string;
}

export default function CM421ItemErrorSelect() {
    const [filteredCount, setFilteredCount] = useState<number>(0); 
    const [selectedHead, setSelectedHead] = useState<string>('Head1'); // Состояние выбора Head по умолчанию Head1
    const [sellectPowerPosition, setSellectPowerPosition] = useState<string>('F35')

    useEffect(() => {
        fetch('/Error.json')
          .then(response => response.json())
          .then((data: LogEntry[]) => {
  
            // Фильтруем данные, используя значение selectedHead
            const filteredEntries = data.filter(item =>
                item.message.includes(selectedHead) && item.message.includes(sellectPowerPosition) && item.level === 'WARNING');
            setFilteredCount(filteredEntries.length);
  
          })
          .catch(error => console.error('Ошибка при загрузке данных:', error));
      }, [selectedHead,sellectPowerPosition]); // Добавляем selectedHead в массив зависимостей
  
      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedHead(event.target.value);
  
      };
      const PowerSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSellectPowerPosition(event.target.value);
    };

  return (
    <div className={s.ItemError__Content}>
                    <h3>Количество записей, где "{selectedHead}" "{sellectPowerPosition}" и статус WARNING:</h3>
                    <div className={s.EquipMC421__Warning__item_sercal}>
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

                      <select value={sellectPowerPosition} onChange={PowerSelectChange}>
                        <option value="F35">F35</option>
                        <option value="F44">F44</option>
                        <option value="F46">F46</option>
                      </select>
                    </div>  
    </div>
  );
}
