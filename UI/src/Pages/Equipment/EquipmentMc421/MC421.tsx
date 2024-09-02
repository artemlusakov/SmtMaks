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
    const [selectedHead, setSelectedHead] = useState<string>('Head1'); // Состояние выбора Head по умолчанию Head1
    const [sellectPowerPosition, setSellectPowerPosition] = useState<string>('F35')

    useEffect(() => {
      fetch('/error.json')
        .then(response => response.json())
        .then((data: LogEntry[]) => {

          const warnings = data.filter(item => item.level === 'WARNING');
          setWarningCount(warnings.length);

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
        <div className={`${'Flex'}`}>
            <Navigation/>

            <div className={s.EquipMC421}>
                <h2>Статистика MC421</h2>

                <div className={s.EquipMC421__Warning}>

                  <div className={s.EquipMC421__Warning__item}>
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

                  <div className={s.EquipMC421__Warning__item}>
                    <h3>Количество записей с уровнем WARNING:</h3>
                    <div className={s.EquipMC421__Warning__item_sercal}>
                      {warningCount}
                    </div>
                  </div>
                  
                </div>


            </div>


        </div>
    );
};

export default EquipMC421;
