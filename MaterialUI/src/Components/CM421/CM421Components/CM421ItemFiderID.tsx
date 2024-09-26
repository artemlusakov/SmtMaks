import React, { useEffect, useState } from 'react';
import './CM421ItemFiderID.css'

interface DataItem {
    datetime: string;
    message: string;
    feeder: string;
    type: string;
    event: string;
    part?: string;
}

export default function CM421ItemFiderID() {
    const [uniqueFeedersParts, setUniqueFeedersParts] = useState<{ feeder: string; part?: string }[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await fetch('/Operate.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: DataItem[] = await response.json();
                
                if (Array.isArray(data)) {
                    const feedersParts: { [key: string]: string[] } = {};
                    
                    data.forEach(item => {
                        const match = item.message.match(/Feeder\s+(\w+)\s(?:Part\s+)([a-zA-Z0-9%._()]+)/i );
                        if (match) {
                            const feeder = match[1].trim();
                            const part = match[2]?.trim();
                            if (!feedersParts[feeder]) {
                                feedersParts[feeder] = [];
                            }
                            feedersParts[feeder].push(part);
                        }
                    });

                    // Создаем список уникальных Feeder с последней частью
                    const uniqueFeedersParts = Object.entries(feedersParts).map(([feeder, parts]) => ({
                        feeder,
                        part: parts.length > 0 ? parts[parts.length - 1] : undefined
                    }));
                    setUniqueFeedersParts(uniqueFeedersParts);
                } else {
                    console.error('Received data is not an array');
                    setUniqueFeedersParts([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setUniqueFeedersParts([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='CM421ItemFiderID'>
            <h3>Список уникальных Feeder с их последними частями</h3>
            <ul>
                {uniqueFeedersParts.map((item, index) => (
                    <li key={index}>
                        Feeder {item.feeder} - Part {(item.part || '')}
                    </li>
                ))}
            </ul>
        </div>
    );
}