import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import s from './CM421Item.module.css';
import { InputMask } from 'primereact/inputmask';
        

interface DataItem {
  datetime: string;
  message: string;
  type?: string;
  event?: string;
  formattedDateTime: string;
}

const CM421itemOperateDate: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [timeDifference, setTimeDifference] = useState<string | null>(null);
  const [startDateInput, setStartDateInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('/Operate.json');
      if (!response.ok) {
        throw new Error('Ошибка загрузки файла Operate.json');
      }
      const jsonData: DataItem[] = await response.json();
      
      // Форматируем дату и время для каждого элемента
      jsonData.forEach(item => {
        item.formattedDateTime = moment(item.datetime, 'YYYY/MM/DDTHH:mm:ss').format('DD.MM.YYYY HH:mm:ss');
      });
      
      setData(jsonData);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const calculateTimeDifference = (): void => {
    if (!data.length) return;

    let startDate: moment.Moment;
    if (startDateInput.trim()) {
      const parsedDate = moment(startDateInput, 'YYYY/MM/DD HH:mm:ss', true);
      if (!parsedDate.isValid()) {
        alert('Неверный формат даты. Пожалуйста, используйте формат YYYY/MM/DD HH:mm:ss');
        return;
      }
      startDate = parsedDate;
    } else {
      startDate = moment(data[0].datetime, 'YYYY/MM/DDTHH:mm:ss');
    }

    const endDate = moment(data[data.length - 1].datetime, 'YYYY/MM/DDTHH:mm:ss');
    const duration = moment.duration(endDate.diff(startDate));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.minutes());
    const seconds = Math.floor(duration.seconds());

    setTimeDifference(`${hours} часов ${minutes} минут ${seconds} секунд`);
  };

  useEffect(() => {
    if (data.length && timeDifference === null) {
      calculateTimeDifference();
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    // Форматируем вводимую дату
    if (value.length === 14) {
      const formattedDate = `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)} ${value.slice(8, 10)}:${value.slice(10, 12)}:${value.slice(12, 14)}`;
      setStartDateInput(formattedDate);
    } else {
      setStartDateInput(value);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    calculateTimeDifference();
  };

  if (!data.length) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className={s.OperateDate__Box}>
      <h2>CM421itemOperateDate</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">
          Введите начальную дату (формат: год/месяц/день ч:мин:сек):
        </label>
        <InputMask
          mask="9999/99/99 99:99:99"  
          id="startDate"
          type="text"
          placeholder="YYYY/MM/DD HH:mm:ss"
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit">Рассчитать</button>
      </form>
      <p>Первое время: {data[0].formattedDateTime}</p>
      <p>Последнее время: {data[data.length - 1].formattedDateTime}</p>
      <p>Разница во времени: {timeDifference}</p>
    </div>
  );
};

export default CM421itemOperateDate;
