import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface JsonI {
    datetime: string;
    message: string;
    feeder?:string;
    type?:string;
    event?:string;
}

const CM421EquipmentEfficiency: React.FC = () => {
    const [data, setData] = useState<JsonI[]>([]);
    const [filterDate, setFilterDate] = useState<string>('');

    useEffect(() => {
        fetch('/Operate.json')
          .then(response => response.json())
          .then((data: JsonI[]) => {
            if (Array.isArray(data)) {
              setData(data);
            } else {
              console.error('Received data is not an array');
            }
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    // Функция для фильтрации записей по времени
    const filterByTime = (dateString: string): JsonI[] => {
        const targetDate = moment(dateString, 'DD/MM/YYYYTHH:mm:ss');
        return data.filter(item => {
            const itemDate = moment(item.datetime, 'DD/MM/YYYYTHH:mm:ss');
            return itemDate.isSame(targetDate, 'minute');
        });
    };

    // Функция для подсчета PCB Count
    const countPCBs = (): number => {
        const filteredData = filterByTime(filterDate);
        const pcbCounts = filteredData.map(item => {
            const match = item.message.match(/PCB Count:\s*(\d+)/);
            return parseInt(match ? match[1] : '0', 10);
        }).filter(count => count > 0);
        
        return pcbCounts.length > 0 ? Math.max(...pcbCounts) : 0;
    };

    // Функция для отображения результатов
    const displayResults = () => {
        const pcbCount = countPCBs();
        return (
            <>
                <h2>PCB Count:</h2>
                <p>{pcbCount}</p>
                <input
                    type="datetime-local"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    placeholder="Enter date to filter"
                />
            </>
        );
    };

    return (
        <div>
            {displayResults()}
        </div>
    );
};

export default CM421EquipmentEfficiency;
