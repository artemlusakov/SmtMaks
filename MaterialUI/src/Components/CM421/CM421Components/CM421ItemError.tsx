import React, { useEffect, useState } from 'react';
import s from "./CM421Item.module.css";
import DonatsWarning from '../../Donats/DonatsWarning'

interface LogEntry {
    timestamp: string;
    id: string;
    level: string;
    message: string;
  }

export default function CM421ItemError() {
    const [warningCount, setWarningCount] = useState<number>(0);

    const [filteredCount, setFilteredCount] = useState<number>(0); 
    const [selectedHead, setSelectedHead] = useState<string>('Head1'); // Состояние выбора Head по умолчанию Head1
    const [selectFider, setSelectFider] = useState<string>('') // Исправлено название переменной


    useEffect(()=>{
        fetch('/Error.json')
        .then(response => response.json())
        .then((data: LogEntry[])=>{
            if(Array.isArray(data)){
                //Фильтруем данные по условию WARNING
                const warnings = data.filter(item => item.level  === 'WARNING');
                setWarningCount(warnings.length);

                // Фильтруем данные, используя значения selectedHead и selectFider
                const filteredEntries = data.filter(item =>
                    item.message.includes(selectedHead) && 
                    (item.message.includes(selectFider) || !selectFider) &&
                    item.level === 'WARNING');
                setFilteredCount(filteredEntries.length);
            }else {
                console.error('Пришёл не масив а:', typeof data);
              }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error))
    }, [warningCount,selectedHead, selectFider])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectedHead(event.target.value);
    }

    const fiderInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const inputValue = event.target.value.toUpperCase();
        setSelectFider(inputValue.replace(/[^A-Z0-9\s]/g, ''));
    }

    return(
        <div className={s.ItemError}>
            <h2>Warnings Distribution</h2>
            <DonatsWarning warningCount={warningCount} filteredCount={filteredCount} />
            <p>Общее количектво WARNING:{warningCount}</p>
            <p>Количество WARNING с {selectedHead} + {selectFider}: {filteredCount}</p>

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
                placeholder='Введите Fider'
                value={selectFider}
                onChange={fiderInputChange}
                pattern="^[A-Z0-9\s]+$"
            />
            </div>
        </div>
    )
}