import React, { useEffect, useState } from 'react';
import s from "./CM421Item.module.css";
import DonatsWarning from '../../Graphs/Donats/DonatsWarning'

interface DataItem {
    timestamp: string;
    id: string;
    head:string;
    level: string;
    message: string;
    feeder: string;
}

export default function CM421ItemError() {
    const [warningCount, setWarningCount] = useState<number>(0);
    const [filteredCount, setFilteredCount] = useState<number>(0);
    const [selectedHead, setSelectedHead] = useState<string>('Head1');
    const [selectFider, setSelectFider] = useState<string>('');


    useEffect(() => {

        fetch('/Error.json')
            .then(response => response.json())
            .then((data: DataItem[]) => {

                if (Array.isArray(data)) {
                    const warnings = data.filter(item => item.level === 'WARNING');
                    setWarningCount(warnings.length);

                    const filteredEntries = data.filter(item =>
                        item.head.includes(selectedHead) &&
                        (item.feeder === (selectFider) || !selectFider) &&
                        item.level === 'WARNING'
                    );
                    setFilteredCount(filteredEntries.length);
                } else {
                    console.error('Received data is not an array');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [selectedHead, selectFider]);

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
            <DonatsWarning warningCount={warningCount} filteredCount={filteredCount} labels ={[ 'Всего Warnings', `Ошибки с ${selectedHead}  ${selectFider}` ]}/>
            
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
