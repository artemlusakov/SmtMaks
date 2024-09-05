import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface DataItem {
  datetime: string;
  message: string;
  type?: string;
  event?: string;
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
      setData(jsonData);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const calculateTimeDifference = (): void => {
    if (!data.length) return;

    let startDate: moment.Moment;
    if (startDateInput.trim()) {
      startDate = moment(startDateInput, 'YYYY-MM-DDTHH:mm:ss', true);
      if (!startDate.isValid()) {
        alert('Неверный формат даты. Пожалуйста, используйте формат YYYY-MM-DDTHH:mm:ss');
        return;
      }
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
    setStartDateInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    calculateTimeDifference();
  };

  if (!data.length) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div>
      <h2>CM421itemOperateDate</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">Введите начальную дату (YYYY-MM-DDTHH:mm:ss):</label>
        <input
          id="startDate"
          type="text"
          value={startDateInput}
          onChange={handleInputChange}
        />
        <button type="submit">Рассчитать</button>
      </form>
      <p>Первое время: {moment(data[0].datetime, 'YYYY/MM/DDTHH:mm:ss').format('DD.MM.YYYY HH:mm:ss')}</p>
      <p>Последнее время: {moment(data[data.length - 1].datetime, 'YYYY/MM/DDTHH:mm:ss').format('DD.MM.YYYY HH:mm:ss')}</p>
      <p>Разница во времени: {timeDifference}</p>
    </div>
  );
};

export default CM421itemOperateDate;
