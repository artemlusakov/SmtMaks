// CM421ItemError.js
import React, { useState, useEffect } from 'react';
import s from "./CM421Item.module.css";
import DonatsWarning from '../../../../Components/Graphs/Donats/DonatsWarning'
import { useWarningCount } from '../../../../Stors/Stor';

interface DataItemError {     // Интерфейс для json файла
    timestamp: string;   // Время
    level: string;      // Состояние
    message: string;    // Сообщение
    feeder: string;     // Отдельный фидер

    head:string;
}

export default function CM421ItemError() {
    const { warningCount, fetchWarningCount } = useWarningCount();

    const [filteredCount, setFilteredCount] = useState<number>(0);
    const [selectedHead, setSelectedHead] = useState<string>('Head1');
    const [selectFider, setSelectFider] = useState<string>('');
    const [data, setData] = useState<DataItemError[]>([]);

    useEffect(() => {
        fetchWarningCount();
    }, []);

    useEffect(() => {
        fetch('/Error.json')
            .then(response => response.json())
            .then((data: DataItemError[]) => {
                setData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const filteredEntries = data.filter(item =>
                item.head.includes(selectedHead) &&
                (item.feeder === (selectFider) || !selectFider) &&
                item.level === 'WARNING'
            );
            setFilteredCount(filteredEntries.length);
        }
    }, [selectedHead, selectFider, data]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedHead(event.target.value);
    };

    const fiderInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toUpperCase();
        setSelectFider(inputValue.replace(/[^A-Z0-9\s]/g, ''));
    };

    const calculatePercentage = (): string => {
        if (warningCount === 0) return '0%';
        const percentage = ((filteredCount / warningCount) * 100).toFixed(2);
        return `${percentage}%`;
    };

    return (
        <div className={s.ItemBox}>
            <h2>График соотношения WARNING</h2>
            
            <DonatsWarning 
                warningCount={warningCount} 
                filteredCount={filteredCount} 
                labels ={[ 'Всего Warnings', `Ошибки с ${selectedHead}  ${selectFider}`]}
            />
            
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
            
            <p>Общее количество WARNING: {warningCount}</p>
            <p>
                Количество WARNING с {selectedHead} и {selectFider ?`Fider ${selectFider}` : "Без Fider"} : 
                {filteredCount} ({calculatePercentage()})
            </p>
        </div>
    );
}