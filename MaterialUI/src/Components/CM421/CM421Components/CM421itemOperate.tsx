import React, { useEffect, useState } from 'react';

interface WorkRecord {
  start: string;
  end: string;
}

export default function CM421ItemOperate() {
  const [workRecord, setWorkRecord] = useState<WorkRecord>({
    start: "",
    end: ""
  });

  const START_DATE = 'Начало работы:';
  const END_DATE = 'Конец работы:';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Operate.json');
        const data: { datetime: string }[] = await response.json();

        if (Array.isArray(data) && data.length >= 2) {
          setWorkRecord({
            start: data[0].datetime,
            end: data[data.length - 1].datetime
          });
        } else {
          console.error('Некорректные данные в Operate.json');
          setWorkRecord({ start: "", end: "" });
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setWorkRecord({ start: "", end: "" });
      }
    };

    fetchData();
  }, []);

  const { start, end } = workRecord;

  return (
    <div>
      <h3>{START_DATE}</h3>
      <p>{start}</p>

      <h3>{END_DATE}</h3>
      <p>{end}</p>
    </div>
  );
}
