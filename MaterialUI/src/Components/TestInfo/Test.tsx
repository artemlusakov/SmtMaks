import React, { useEffect, useState } from 'react'

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

  const [FeedersInfo, setFeedersInfo] = useState<{ feeder?: string; part?: string; feederId?: string }[]>([]);

  useEffect(()=>{
    fetch('/Operate')
    .then(response => response.json())
    .then((data: DataItem[]) => {
      if(Array.isArray(data)){
        const feedersParts: { [key: string]: { part?: string; feederId?: string } } = {};
        data.forEach(item=>{
          const match = item.message.match(/Feeder\s+(\w+)\s(?:Part\s+)([a-zA-Z0-9%._()]+)/i);

          if(match){
            const feeder = match[1].trim();
            const part = match[2]?.trim();
          }

                      // Создаем список Feeder 
                      const FeedersParts = Object.entries(feedersParts).map(([feeder,part]) => ({
                        feeder,
                        part: part || '',
                    }));
        })
      }else {
          console.error('Received data is not an array');
          setFeedersInfo([])
        }
        })
    .catch(error => console.error('Error fetching data:', error)); 
  },[])



  return (
    <div className='CM421ItemFiderID'>
    <h3>Список Part и FeederID</h3>
    <ul>
    {FeedersParts.map((item, index) => (
        <li key={index}>
            Feeder {item.feeder}  Part - {item.part }
        </li>
    ))}
    </ul>
</div>
  )
}
