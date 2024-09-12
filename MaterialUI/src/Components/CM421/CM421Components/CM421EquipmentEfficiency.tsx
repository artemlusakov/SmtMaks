import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { InputMask } from 'primereact/inputmask';

interface JsonI {
    datetime: string;
    message: string;
    feeder?:string;
    type?:string;
    event?:string;
}

const CM421EquipmentEfficiency: React.FC = () => {
    const [completedTasks, setCompletedTasks] = useState<number>(0);
    
    const [startDateInput, setStartDateInput] = useState('');
    const [endDateInput, setEndDateInput] = useState('');

    const [timeDifference, setTimeDifference] = useState<string | null>(null);

    // Функция для форматирования даты
    const formatDate = (value: string): string => {
        if (value.length === 14) {
            return `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)} ${value.slice(8, 10)}:${value.slice(10, 12)}:${value.slice(12, 14)}`;
        }
        return value;
    };

    // Обработчик изменения ввода
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        const inputId = e.target.id;

        if (inputId === 'startDate') {
            setStartDateInput(formatDate(value));
        } else if (inputId === 'endDate') {
            setEndDateInput(formatDate(value));
        }
    };

    useEffect(() => {
        fetch('/Operate.json')
          .then(response => response.json())
          .then((data: JsonI[]) => {
            if (Array.isArray(data)) {
                const pcbRecords = data.filter(item => item.message.includes('[LMEvent::RID_EVENT_PCB]'));
                setCompletedTasks(pcbRecords.length);
                localStorage.setItem('pcbRecords', JSON.stringify(pcbRecords));
            } else {
              console.error('Received data is not an array');
            }
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    const CalculateDateWork = () => {
        if (!completedTasks) return;

        let startDate: moment.Moment;
        let endDate: moment.Moment;

        try {
            if (startDateInput.trim()) {
                startDate = moment(startDateInput, 'YYYY/MM/DD HH:mm:ss', true);
            } else {
                const pcbRecords = JSON.parse(localStorage.getItem('pcbRecords') || '[]');
                startDate = moment(pcbRecords[0]?.datetime, 'YYYY/MM/DDTHH:mm:ss');
            }

            if (endDateInput.trim()) {
                endDate = moment(endDateInput, 'YYYY/MM/DD HH:mm:ss', true);
            } else {
                const pcbRecords = JSON.parse(localStorage.getItem('pcbRecords') || '[]');
                endDate = moment(pcbRecords[pcbRecords.length - 1]?.datetime, 'YYYY/MM/DDTHH:mm:ss');
            }

            if (!startDate.isValid() || !endDate.isValid()) {
                throw new Error();
            }

            const duration = moment.duration(endDate.diff(startDate));
            const hours = Math.floor(duration.asHours());
            const minutes = Math.floor(duration.minutes());
            const seconds = Math.floor(duration.seconds());

            setTimeDifference(`${hours} часов ${minutes} минут ${seconds} секунд`);
        } catch (error) {
            alert('Неверный формат даты. Пожалуйста, используйте формат YYYY/MM/DD HH:mm:ss');
        }
    };

    return (
        <div>
            {completedTasks}

            <InputMask
              mask="9999/99/99 99:99:99"  
              id="startDate"
              type="text"
              placeholder="начальная YYYY/MM/DD HH:mm:ss"
              onChange={(e) => handleInputChange(e)}
            />

            <InputMask
              mask="9999/99/99 99:99:99"  
              id="endDate"
              type="text"
              placeholder="конечная YYYY/MM/DD HH:mm:ss"
              onChange={(e) => handleInputChange(e)}
            />

            <button onClick={CalculateDateWork}>Рассчитать</button>

            {timeDifference && <p>Разница во времени: {timeDifference}</p>}
        </div>
    );
};

export default CM421EquipmentEfficiency;
