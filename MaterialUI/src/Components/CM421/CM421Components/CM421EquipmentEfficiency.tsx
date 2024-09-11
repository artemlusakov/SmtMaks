import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface JsonI {
    datetime: string;
    message: string;
    feeder?: string;
    type?: string;
    event?: string;
}

const CM421EquipmentEfficiency: React.FC = () => {
    const [completedTasks, setCompletedTasks] = useState<number>(0);
    const [workDates, setWorkDates] = useState<{startOfWork: moment.Moment | null; endOfWork: moment.Moment | null} | null>(null);

    const CalculateDateWork = (data: JsonI[]): {startOfWork: moment.Moment | null; endOfWork: moment.Moment | null} => {
        let startOfWork: moment.Moment | null = null;
        let endOfWork: moment.Moment | null = null;

        // Преобразуем даты в формат, понятный Moment.js
        const formattedDates = data.map(item => ({
            ...item,
            datetime: moment(item.datetime).format('YYYY-MM-DDTHH:mm:ss')
        }));

        // Находим начало работы
        const clampEventIndex = formattedDates.findIndex(item => item.type === 'ClampEvent');

        if (clampEventIndex !== -1) {
            startOfWork = moment(formattedDates[clampEventIndex].datetime);
        }

        // Находим конец работы
        const lastPcbCountIndex = formattedDates.findIndex(item => item.message.includes('PCB Count'));

        if (lastPcbCountIndex !== -1 && lastPcbCountIndex > clampEventIndex) {
            endOfWork = moment(formattedDates[lastPcbCountIndex].datetime);
        }

        return {
            startOfWork,
            endOfWork
        };
    };

    useEffect(() => {
        fetch('/Operate.json')
          .then(response => response.json())
          .then((data: JsonI[]) => {
            if (Array.isArray(data)) {
                const pcbRecords = data.filter(item => item.message.includes('[LMEvent::RID_EVENT_PCB]'));
                setCompletedTasks(pcbRecords.length);

                const workDates = CalculateDateWork(data);
                setWorkDates(workDates);

                console.log('Начало работы:', workDates?.startOfWork?.format());
                console.log('Конец работы:', workDates?.endOfWork?.format());
            } else {
              console.error('Received data is not an array');
            }
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <p>Заданий выполнено: {completedTasks}</p>
            {workDates ? (
                <>
                    <p>Начало работы: {workDates.startOfWork?.format('HH:mm')}</p>
                    <p>Конец работы: {workDates.endOfWork?.format('HH:mm')}</p>
                </>
            ) : (
                <p>Информация о дате работы не доступна.</p>
            )}
        </div>
    );
};

export default CM421EquipmentEfficiency;
