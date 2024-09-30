import React, { useEffect, useState } from 'react';

// Определяем интерфейс для объекта DataItem
interface DataItem {
    datetime: string;
    message: string;
    feeder: string;
    type: string;
    event: string;
}

// Экспортируем компонент LockedUnlocked
export default function LockedUnlocked() {
    // Используем хук useState для управления состоянием locked и unlocked
    const [locked, setLocked] = useState<number>(0);
    const [unlocked, setUnlocked] = useState<number>(0);

    // Используем хук useEffect для выполнения побочных эффектов при монтировании компонента
    useEffect(() => {
        // Функция для получения данных из API
        fetch("/Operate.json")
            .then(response => response.json())
            .then((data: DataItem[]) => {
                // Проверяем, является ли полученная данные массивом
                if (Array.isArray(data)) {
                    // Подсчитываем количество Locked и Unlocked событий
                    const LockedCount = data.filter(item => item.event === 'Locked').length;
                    const UnLockedCount = data.filter(item => item.event === 'Unlocked').length;

                    // Обновляем состояние locked и unlocked
                    setLocked(LockedCount);
                    setUnlocked(UnLockedCount);
                } else {
                    console.error('Received data is not an array');
                    setLocked(0);
                    setUnlocked(0);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Пустой массив зависимостей означает выполнение только при монтировании компонента

    return (
        <div>
            {/* Заголовок компонента */}
            <h2>Статистика станков</h2>
            {/* Список со статистикой */}
            <ul>
                <li>Всего станок открывали: {unlocked}</li>
                <li>Всего станок закрывали: {locked}</li>
            </ul>
        </div>
    );
}