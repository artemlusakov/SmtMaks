import React, { useState, useEffect } from 'react';
import s from './CM421Item.module.css'

interface DataItem {
    timestamp: string;
    level: string;
    message: string;
    feeder?: string;
    head?: string;
    type?: string;
    event?: string;
    part?: string;
}

const getErrorCodeFromMessage = (message: string): string | null => {
    const match = message.match(/\[[a-zA-Z0-9]+\]/);
    if (match) {
        return match[0].slice(1, -1); // Возвращаем только цифры и буквы из скобок
    }
    return null;
};

const getErrorDescription = (code: string): string => {
    switch (code) {
        case '5613':
            return 'Пневматическая ошибка при подхвате компонента';
        case '5201':
            return 'Превышен счетчик повторных попыток подъема детали для подающего устройства';
        case '4605':
            return 'Превышен счетчик повторных попыток подъема детали для подающего устройства';
        case '3093':
            return 'Доска никогда не достигла датчика работы на станции';
        case '3094':
            return 'Станция никогда не очистила датчик работы';
        case '4803':
            return 'Не удается открыть затвор подающего устройства ленты';
        case '5003':
            return 'Монтирование завершено для пользовательского заданного количества PCB';
        case '5100':
            return 'Истощение детали в подающем устройстве';
        case '5804':
            return 'Клапан клеща открыт';
        case '5805':
            return 'Клапан клеща закрыт';
        case '552':
            return 'Не удалось найти детали';
        case '4573':
            return 'Превышен счетчик повторных попыток подъема детали для подающего устройства';
        case '2498':
            return 'Клапан клеща открыт';
        case '2459':
            return 'Клапан клеща закрыт';
        case '1698':
            return 'Ошибка индекса подающего устройства';
        case '0065':
            return 'Ошибка в коде ошибки';
        case '3067':
            return 'Не удается произвести PCB из-за несоответствия ширины рельсов и ширины печатной платы';
        case '5101':
            return 'Превышен счетчик повторных попыток подъема детали для ленточного подающего устройства';
        case '5300':
            return 'Истощение детали в ленточном подающем устройстве';
        case '5301':
            return 'Превышен счетчик повторных попыток подъема детали для ленточного подающего устройства';
        case '5611':
            return 'Пневматическая ошибка при подхвате детали из ленточного подающего устройства';
        case '5615':
            return 'Пневматическая ошибка при подхвате детали из ленточного подающего устройства';
        case '5630':
            return 'Пневматическая ошибка перед размещением детали. Нет детали на головке';
        case '5633':
            return 'Подхват грань детали из подающего устройства';
        case '5803':
            return 'Ошибка индекса подающего устройства';
        case '5806':
            return 'Ошибка открытия подающего устройства F40';
        case 'aa1f':
            return ' Головной URC Не удалось подобрать деталь должным образом';
        case 'fe02':
            return 'Устройство подачи детали Превышено количество повторных попыток захвата детали для устройства подачи палочек';
        case 'aa04':
            return 'Не удалось найти запчасти';
    

        default:
            return 'Неизвестная ошибка';
    }
};

const ErrorCodesComponent = () => {
    const [errorCodes, setErrorCodes] = useState<Record<string, { count: number; description: string }>>({});

    useEffect(() => {
        fetch('/Error.json')
            .then(response => response.json())
            .then((data: DataItem[]) => {
                if (Array.isArray(data)) {
                    const filteredErrors = data.filter(item => item.level === 'WARNING');

                    const codes = filteredErrors.reduce((acc: Record<string, { count: number; description: string }>, item) => {
                        const errorCode = getErrorCodeFromMessage(item.message);
                        if (errorCode) {
                            acc[errorCode] = {
                                count: (acc[errorCode]?.count || 0) + 1,
                                description: getErrorDescription(errorCode)
                            };
                        }
                        return acc;
                    }, {});

                    setErrorCodes(codes);
                } else {
                    console.error('Неверные данные: data не массив');
                }
            });
    }, []);

    return (
        <div className={s.ErrorCodesComponent}>
            <h3>Количество ошибок по кодам</h3>
            <ul>
                {Object.entries(errorCodes).map(([code, { count, description }]) => (
                    <li key={code}>
                        [{code}] - {description} <div className='Color_red'>({count})</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ErrorCodesComponent;
