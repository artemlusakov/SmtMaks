import Navigation from "../../../Components/Navigation/Navigation";
import { useState, useEffect } from 'react';

interface LogEntry {
    timestamp: string;
    id: string;
    level: string;
    message: string;
  }
  

const EquipMC421 = () => {

    const [warningCount, setWarningCount] = useState<number>(0);

    useEffect(() => {
      fetch('/error.json')
        .then(response => response.json())
        .then((data: LogEntry[]) => {
          const warnings = data.filter(item => item.level === 'WARNING');
          setWarningCount(warnings.length);
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
    }, []); 

    return (
        <div className={`${'Flex'}`}>
            <Navigation/>

            <div>
                <h2>Статистика MC421</h2>
            </div>

            <div>
                Количество записей с уровнем WARNING: {warningCount}
            </div>
        </div>
    );
};

export default EquipMC421;