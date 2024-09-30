import React, { useState, useEffect } from 'react';
import './ErrorCodesComponent.css';
import ErrorCodesColumn from '../../../../Components/Graphs/Column/ErrorCodesColumn';
import GridLoader from '../../../../Components/Loader/GridLoader';

// Определяем интерфейс для элемента данных
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

// Функция для извлечения кода ошибки из сообщения
const getErrorCodeFromMessage = (message: string): string | null => {
    const match = message.match(/\[[a-zA-Z0-9]+\]/);
    if (match) {
        return match[0].slice(1, -1); // Возвращаем только цифры и буквы из скобок
    }
    return null;
};

// Функция для получения описания ошибки по коду
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
            return 'Не удалось захватить компонент должным образом';
        case 'fe02':
            return 'Устройство подачи детали Превышено количество повторных попыток захвата детали для устройства подачи палочек';
        case 'aa04':
            return 'Не удалось найти запчасти';
        case 'aa0f':
            return 'Высота подъема детали признается ниже ее реальной';
        case 'e200':
            return 'Пневматическое давление не подается';
        case 'ff01':
            return 'Возврат завершен правильно';
        case '0950':
            return 'Учебный блок был отключен спереди';
        case '0953':
            return 'Учебный блок был включен на передней стороне';
        case 'ae05':
            return 'Не удалось найти край реперной метки';
        case 'a131':
            return 'Не удалось распознать первую контрольную метку печатной платы';
        case 'a613':
            return 'Невозможно найти последнее (нижнее) отведение в группе левых отведений';
        case 'aa0b':
            return 'Угол детали выходит за пределы контрольного значения';
        case 'aa10':
            return 'Высота подъема детали признана выше ее реальной';
        case 'ab0d':
            return 'Неправильные номера отведений';
        case 'aa0a':
            return 'Центральное положение детали слишком эксцентрично';
        case 'aa1c':
            return 'Центральное положение детали слишком эксцентрично';
        case 'aa2a':
            return 'Не удалось правильно подобрать деталь';
        case 'ae04':
            return 'Найденная оценка ниже введенной. (Идентификатор камеры: 1)';
        case 'a132':
            return '[StationF2] Не удалось распознать вторую контрольную метку печатной платы';
        case 'bc00':
            return 'Машина не в состоянии готовности';
        case 'c10c':
            return 'Gantry1 Невозможно переместить, так как был превышен диапазон движения камеры по XY';
        case 'a611':
            return 'Невозможно найти последний (правый) вывод группы верхних выводов';
        case 'a651':
            return 'Нет яркого пикселя на последней (правой) позиции отведения верхней группы отведений.';
        case 'a671':
            return 'LeadGroup 0: количество несовпадающих потенциальных клиентов';
        case 'fe01':
            return 'Устройство подачи головки Превышено количество повторных попыток захвата детали для устройства подачи ленты';
        case 'a652':
            return 'S1-(1 2 или 3) Нет яркого (70) пикселя на последнем (нижнем) положении отведения левой группы отведений';
        case 'a665':
            return 'Количество несовпадающих отведений';
        case 'aa1a':
            return 'Длина детали распознается больше ее реальной';
        case 'aa19':
            return 'Длина детали признана меньшей ее реальной';
        case 'ab0e':
            return 'Ошибка при поиске упреждения для расчета угла';
        case '9d82':
            return 'Превышено количество лидов лимит 10';
        case 'ab20':
            return 'Внутренняя ошибка функции (TrCenterCorrection)';
        case 'aa20':
            return 'Ошибка при обнаружении края';
        case 'ae12':
            return 'Слишком низкий контраст между точкой отсчета и фоном';
        case 'ff00':
            return 'Не могу запустить производство';
        case 'a660':
            return 'Невозможно найти ни одного отведения';
        case 'aa28':
            return 'Ошибка во время проверки катушки';
        case 'a620':
            return 'Измеренный шаг () длиннее зарегистрированного максимального значения ()';
        case 'a402':
            return 'В процессе просмотра произошла внутренняя ошибка';
        case 'ab02':
            return 'Количество нижних контактов должно быть больше двух в случае проверки нагрева';
        case 'ab17':
            return 'Измеренный шаг () короче зарегистрированного минимального значения ()';
        case 'ab18':
            return 'Каждое расстояние между нижними отведениями выходит за пределы референтного значения';
        case 'a621':
            return 'Измеренный шаг () короче зарегистрированного минимального значения ()';
        case 'ab0f':
            return 'Неверный угол, рассчитанный по отведению';
        case 'aa09':
            return 'Центральное положение детали слишком эксцентрично';
        case '308f':
            return 'Табло висит на станции';
        case 'a130':
            return 'Не удалось распознать реперную метку';
        case 'aa1e':
            return 'Ширина детали короче эталонной';
 
        default:
            return 'Неизвестная ошибка';
    }
};

const ErrorCodesComponent = () => {
    const [errorCodes, setErrorCodes] = useState<Record<string, { count: number; description: string }>>({});
    const [inputCode, setInputCode] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCode(event.target.value.toLocaleLowerCase());
    };
    const [isLoading, setIsLoading] = useState(true)

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
            setIsLoading(false);
          });
      }, []);
      
      if(isLoading){
        return(
                <GridLoader/>
        )
      }
    return (
        <div className={"ErrorCodesComponent"}>
            <h3>Количество ошибок по кодам</h3>
            
            <div>
                <input 
                    type="text" 
                    placeholder="Введите код ошибки" 
                    value={inputCode} 
                    onChange={handleInputChange}
                />
                
                <p>Описание: {getErrorDescription(inputCode)}</p>
            </div>

            <ErrorCodesColumn errorCodes={errorCodes} />

            <ul>
                {Object.entries(errorCodes).map(([code, { count, description }]) => (
                    <li key={code}>
                        [{code}] - {description} <div className='Color_red'>Количество: ({count})</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ErrorCodesComponent;
