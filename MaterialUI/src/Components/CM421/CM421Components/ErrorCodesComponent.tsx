import React, { useState, useEffect } from 'react';

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

const ErrorCodesComponent = () => {
    const [errorCodes, setErrorCodes] = useState<Record<string, { count: number; description: string }>>({});

    useEffect(() => {
        fetch('/Error.json')
            .then(response => response.json())
            .then((data: DataItem[]) => {
                if (Array.isArray(data)) {
                    const filteredErrors = data.filter(item => item.level !== 'INFO' && item.level !== 'NORMAL');

                    const codes = filteredErrors.reduce((acc: Record<string, { count: number; description: string }>, item) => {
                        let match = item.message.match(/\[(\d+)\]/);
                        if (match && match[1]) {
                            const code = match[1];
                            acc[code] = {
                                count: (acc[code]?.count || 0) + 1,
                                description: getErrorDescription(code)
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
            default:
                return 'Неизвестная ошибка';
        }
    };

    return (
        <div>
            <h3>Количество ошибок по кодам</h3>
            <ul>
                {Object.entries(errorCodes).map(([code, { count, description }]) => (
                    <li key={code}>
                        [{code}] - {description} ({count})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ErrorCodesComponent;
    