import React, { useState, useEffect } from 'react';
import  './MainClok.css'

export default function MainClok() {
  const [time, setTime] = useState('00 00 0000 00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2,'0');
      const month = String(now.getMonth() + 1).padStart(2,'0');
      const year = String(now.getFullYear()).padStart(4,'0')
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      setTime(`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div className="Mainclock">{time}</div>;
}
