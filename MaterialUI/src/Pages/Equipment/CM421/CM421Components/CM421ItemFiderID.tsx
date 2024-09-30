import React, { useEffect, useState } from 'react';
import './CM421ItemFiderID.css';

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
    const [isLoading, setIsLoading] = useState(true);

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
                        const match = item.message.match(/Feeder\s+(\w+)\s+(?:(?:Part\s+)(.+?)\s*Clamp)?/i);
                        if (match) {
                            const feeder = match[1].trim();
                            const part = match[2]?.trim();

                            const feederIdMatch = item.message.match(/FeederID\((\d+)\)$/);
                            const feederId = feederIdMatch ? feederIdMatch[1] : undefined;
                            if(part){
                            feedersParts[feeder] = { part, feederId };
                            }
                        }
                    });

                    const sortedFeedersParts = Object.entries(feedersParts).map(([feeder, { part, feederId }]) => ({
                        feeder,
                        part: part ,
                        feederId: feederId || ''
                    })).sort((a, b) => {
                        if (a.feeder.startsWith('F') && b.feeder.startsWith('F')) {
                            return parseInt(a.feeder.slice(1)) - parseInt(b.feeder.slice(1));
                        } else if (a.feeder.startsWith('R') && b.feeder.startsWith('R')) {
                            return a.feeder.localeCompare(b.feeder);
                        } else {
                            return a.feeder.localeCompare(b.feeder);
                        }
                    });
                    
                    setFeedersParts(sortedFeedersParts);
                } else {
                    console.error('Received data is not an array');
                    setFeedersParts([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setFeedersParts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='CM421ItemFiderID'>
            <h3>Список Feeder с их Part и FeederID</h3>
            <ul>
                {FeedersParts.map((item, index) => (
                    <li key={index}>
                        Feeder {item.feeder}  Part - ({(item.part || '')}) FeederID - {(item.feederId || '')}
                    </li>
                ))}
            </ul>
        </div>
    );
}