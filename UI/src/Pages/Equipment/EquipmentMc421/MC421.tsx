import Navigation from "../../../Components/Navigation/Navigation";
import { useState, useEffect } from 'react';
import s from './MC421.module.css'

interface LogEntry {
    timestamp: string;
    id: string;
    level: string;
    message: string;
  }
  

const EquipMC421 = () => {

    const [warningCount, setWarningCount] = useState<number>(0);
    const [filteredCount, setFilteredCount] = useState<number>(0);

    useEffect(() => {
      fetch('/error.json')
        .then(response => response.json())
        .then((data: LogEntry[]) => {

          const warnings = data.filter(item => item.level === 'WARNING');
          setWarningCount(warnings.length);

          // Фильтруем данные, чтобы найти записи, где message содержит "Head4" и "F35"
          const filteredEntries = data.filter(item =>
          item.message.includes("Head4") && item.message.includes("F35") && item.level === 'WARNING');
          setFilteredCount(filteredEntries.length);

          
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));

        
    }, []); 

    return (
        <div className={`${'Flex'}`}>
            <Navigation/>

            <div>
                <h2>Статистика MC421</h2>

                <ul>
                  <li>Количество записей с уровнем WARNING: {warningCount}</li>  
                  <li>Количество записей, где "Head4" "F35" и статус WARNING: {filteredCount}</li>  
                </ul>
            </div>


        </div>
    );
};

export default EquipMC421;