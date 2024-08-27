const fs = require('fs');
const path = require('path');

// Функция для чтения и преобразования лог-файла в JSON
function convertLogToJson(logFilePath) {
    const logData = fs.readFileSync(logFilePath, 'utf8');
    const lines = logData.split('\n').filter(line => line.trim() !== ''); // Разбиваем на строки и удаляем пустые
    const jsonObjects = lines.map(line => {
        const match = line.match(/(\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[([^\]]+)\] <(\w+)> (.+)/);
        if (match) {
            return {
                timestamp: match[1],
                error_id: match[2],
                level: match[3],
                message: match[4]
            };
        }
        return null; // Если не соответствует формату, возвращаем null
    }).filter(obj => obj !== null); // Удаляем null значения

    // Сохраняем результат в файл JSON
    const jsonOutputPath = logFilePath.replace('.log', '.json'); // Меняем расширение файла на .json
    fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonObjects, null, 2), 'utf8');

    console.log(`Файл ${jsonOutputPath} успешно создан.`);
}

// Путь к вашему лог-файлу
const logFilePath = path.join(__dirname, 'Error.log'); // Замените ' впиши название файла.log ' на имя вашего файла

convertLogToJson(logFilePath);
