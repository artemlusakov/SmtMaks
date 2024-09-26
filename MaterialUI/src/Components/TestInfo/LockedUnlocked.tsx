import React, { useEffect, useState } from 'react'

interface DataItem {
    datetime: string;
    message: string;
    feeder: string;
    type: string;
    event: string;
}

export default function LockedUnlocked() {
    const[locked, setLocked] = useState<number>(0)
    const[unlocked, setUnlocked] = useState<number>(0)

    useEffect(()=>{
        fetch("/Operate.json")
        .then(response => response.json())
        .then((data: DataItem[]) => {
            if (Array.isArray(data)) {
              const LockedCount = data.filter(item => item.event === 'Locked').length;
              const UnLockedCount = data.filter(item => item.event === 'Unlocked').length;

              setLocked(LockedCount);
              setUnlocked(UnLockedCount);
            } else {
              console.error('Received data is not an array');
              setLocked(0);
              setUnlocked(0);
            }
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);
  return (
    <div>
        <h2>Статистика станков</h2>
        <ul>
            <li>Всего станок открывали: {unlocked}</li>
            <li>Всего станок закрывали: {locked}</li>
        </ul>
    </div>
  )
}




