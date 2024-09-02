const fs = require('fs');
const path = require('path');

// Функция для проверки и удаления существующего JSON-файла
function checkAndRemoveExistingFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Файл ${filePath} успешно удален.`);
    } else {
        console.log(`Файл ${filePath} не найден.`);
    }
}

// Функция для чтения и преобразования лог-файла в JSON
function convertLogToJson(inputLogFilePath, outputJsonPath) {
    checkAndRemoveExistingFile(outputJsonPath); // Удаляем существующий файл перед созданием нового

    const logData = fs.readFileSync(inputLogFilePath, 'utf8');
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
    fs.writeFileSync(outputJsonPath, JSON.stringify(jsonObjects, null, 2), 'utf8');

    console.log(`Файл ${outputJsonPath} успешно создан.`);
}

// Путь к входному лог-файлу
const inputLogFilePath = path.join('C:', 'Users', 'artem', 'OneDrive', 'Рабочий стол', 'SmartCM 421', 'SmartSM', 'Log', 'Error.log');

// Путь для выходного JSON-файла
const outputJsonPath = path.join('D:', 'SmtMaks', 'MaterialUI', 'public', 'Error.json');

convertLogToJson(inputLogFilePath, outputJsonPath);
