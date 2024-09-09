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

// Функция для парсинга строки лога
function parseLogLine(line) {
  const regex = /(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2}:\d{2}) (.*)/;
  const match = line.match(regex);
  if (!match) return null;

  const [, date, time, message] = match;
  const datetime = `${date} ${time}`;

  // Извлекаем Feeder из сообщения
  const feederMatch = message.match(/(?:^|\s)(F\d{1,3}|R\d{1,3})(?:\s|$)/);
  const feeder = feederMatch ? feederMatch[1].trim() : '';

  // Извлекаем Head из сообщения
  const headMatch = message.match(/(?:^|\s)(Head\d+)/);
  const head = headMatch ? headMatch[1].trim() : 'Unknown';

  // Остальная часть парсинга остается без изменений
  let parsedMessage;
  if (message.includes("Failed to pick up a part properly")) {
    const partRegex = /Part (.*)/;
    const partMatch = message.match(partRegex);
    if (partMatch) {
      parsedMessage = {
        type: "PartError",
        part: partMatch[1]
      };
    }
  } else if (message.includes("The retry count for part pickup was exceeded")) {
    const feederRegex = /Feeder (.*) Part (.*)/;
    const feederMatch = message.match(feederRegex);
    if (feederMatch) {
      parsedMessage = {
        type: "FeederError",
        feeder: feederMatch[1],
        part: feederMatch[2]
      };
    }
  } else if (message.includes("Clamp Unlocked")) {
    const clampRegex = /Clamp Unlocked/;
    parsedMessage = {
      type: "ClampEvent",
      event: "Unlocked"
    };
  } else if (message.includes("Clamp Locked")) {
    const clampRegex = /Clamp Locked/;
    parsedMessage = {
      type: "ClampEvent",
      event: "Locked"
    };
  }

  return {
    timestamp: datetime,
    level: determineLogLevel(message),
    message: message.trim(),
    feeder: feeder,
    head: head,
    ...parsedMessage
  };
}

// Функция для определения уровня логирования
function determineLogLevel(message) {
  // Здесь можно реализовать свою логику определения уровня логирования
  // Например, поиск слов "WARNING", "ERROR" или других ключей
  if (message.includes("WARNING")) return "WARNING";
  if (message.includes("ERROR")) return "ERROR";
  return "INFO"; // По умолчанию
}

// Функция для чтения и преобразования лог-файла в JSON
function convertLogToJson(inputLogFilePath, outputJsonPath) {
    checkAndRemoveExistingFile(outputJsonPath); // Удаляем существующий файл перед созданием нового

    fs.readFile(inputLogFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        const lines = data.split('\n').filter(line => line.trim() !== '');
        const jsonObjects = lines.map(parseLogLine).filter(obj => obj !== null);

        // Сохраняем результат в файл JSON
        fs.writeFile(outputJsonPath, JSON.stringify(jsonObjects, null, 2), 'utf8', err => {
            if (err) throw err;
            console.log(`Файл ${outputJsonPath} успешно создан.`);
        });
    });
}

// Пути к входным лог-файлам
const inputLogFilePaths = [
    path.join('C:', 'Users', 'artem', 'OneDrive', 'Рабочий стол', 'SmartCM 421', 'SmartSM', 'Log', 'Error.log'),
    path.join('C:', 'Users', 'artem', 'OneDrive', 'Рабочий стол', 'SmartCM 421', 'SmartSM', 'Log', 'Operate.log')
];

// Пути для выходных JSON-файлов
const outputJsonPaths = [
    path.join('D:', 'SmtMaks', 'MaterialUI', 'public', 'Error.json'),
    path.join('D:', 'SmtMaks', 'MaterialUI', 'public', 'Operate.json')
];

// Преобразуем лог-файлы в JSON
inputLogFilePaths.forEach((inputPath, index) => {
    convertLogToJson(inputPath, outputJsonPaths[index]);
});
