import React, { useEffect, useState } from 'react';
import s from "./CM421Item.module.css";

interface LogEntry {
  timestamp: string;
  id: string;
  level: string;
  message: string;
}

export default function CM421ItemError() {
  const [warningCount, setWarningCount] = useState<number>(0);

  useEffect(() => {
    fetch('/Error.json')
      .then(response => response.json())
      .then((data: any) => {
        // console.log('Received data:', data); // Log the received data
        
        if (Array.isArray(data)) {
          const warnings = data.filter(item => item.level === 'WARNING');
          setWarningCount(warnings.length);
        } else {
          console.error('Expected an array, but received:', typeof data);
        }
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  return (
    <div className={s.ItemError__Content}>
      <h3>Количество записей с уровнем WARNING:</h3>
      <div className={s.ItemError__Content_num}>
        {warningCount}
      </div>
    </div>
  );
}
