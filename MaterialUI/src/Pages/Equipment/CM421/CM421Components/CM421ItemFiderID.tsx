import React, { useEffect, useState } from 'react';
import './CM421ItemFiderID.css'

interface DataItem {
    datetime: string;
    message: string;
    feeder: string;
    type: string;
    event: string;
    part?: string;
    feederId?: string;
}

export default function Test() {
    const [FeedersParts, setFeedersParts] = useState<{ feeder: string; part?: string; feederId?: string }[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await fetch('/Operate.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: DataItem[] = await response.json();
                
                if (Array.isArray(data)) {
                    const feedersParts: { [key: string]: { part?: string; feederId?: string } } = {};
                    
                    data.forEach(item => {
                        const match = item.message.match(/Feeder\s+(\w+)\s(?:Part\s+)([a-zA-Z0-9%._()]+)/i);
                        if (match) {
                            const feeder = match[1].trim();
                            const part = match[2]?.trim();

                            // Проверяем, есть ли соответствующее сообщение с FeederID
                            const feederIdMatch = item.message.match(/FeederID\((\d+)\)$/);
                            const feederId = feederIdMatch ? feederIdMatch[1] : undefined;

                            if (!feedersParts[feeder]) {
                                feedersParts[feeder] = { part, feederId };
                            }
                        }
                    });

                    // Создаем список Feeder 
                    const FeedersParts = Object.entries(feedersParts).map(([feeder, { part, feederId }]) => ({
                        feeder,
                        part: part || '',
                        feederId: feederId || ''
                    }));
                    setFeedersParts(FeedersParts);
                } else {
                    console.error('Received data is not an array');
                    setFeedersParts([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setFeedersParts([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='CM421ItemFiderID'>
            <h3>Список Feeder с их Part и FeederID</h3>
            <ul>
                {FeedersParts.map((item, index) => (
                    <li key={index}>
                        Feeder {item.feeder}  Part - {(item.part || '')}  FeederID - {(item.feederId || '')}
                    </li>
                ))}
            </ul>
        </div>
    );
}
