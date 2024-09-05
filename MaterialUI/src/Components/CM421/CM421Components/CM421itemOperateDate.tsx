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

      // Извлечение первого и последнего datetime
      const firstDateTime = moment(jsonData[0].datetime, 'YYYY/MM/DDTHH:mm:ss');
      const lastDateTime = moment(jsonData[jsonData.length - 1].datetime, 'YYYY/MM/DDTHH:mm:ss');

      // Вычисление разницы
      const duration = moment.duration(lastDateTime.diff(firstDateTime));

      // Форматирование результата
      const hours = Math.floor(duration.asHours());
      const minutes = Math.floor(duration.minutes());
      const seconds = Math.floor(duration.seconds());

      setTimeDifference(`${hours} часов ${minutes} минут ${seconds} секунд`);

      setData(jsonData);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  if (!data.length || timeDifference === null) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div>
      <h2>CM421itemOperateDate</h2>
      <p>Первое время: {moment(data[0].datetime, 'YYYY/MM/DDTHH:mm:ss').format('DD.MM.YYYY HH:mm:ss')}</p>
      <p>Последнее время: {moment(data[data.length - 1].datetime, 'YYYY/MM/DDTHH:mm:ss').format('DD.MM.YYYY HH:mm:ss')}</p>
      <p>Разница во времени: {timeDifference}</p>
    </div>
  );
};

export default CM421itemOperateDate;
