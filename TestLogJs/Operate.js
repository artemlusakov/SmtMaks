const fs = require('fs');
const path = require('path');

// Функция для парсинга строки лога
function parseLogLine(line) {
  // Регулярное выражение для извлечения даты, времени и сообщения
  const regex = /(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2}:\d{2}) (.*)/;
  const match = line.match(regex);
  if (!match) return null;

  const [, date, time, message] = match;
  const datetime = `${date}T${time}`;

  // Регулярное выражение для поиска фидера (R или F, за которыми следуют до трех цифр)
  const feederRegex = /[RF]\d{1,3}/g;
  
  let parsedMessage = {};
  let feederMatch = feederRegex.exec(message);

  // Извлечение информации о фидере
  if (feederMatch) {
    parsedMessage.feeder = feederMatch[0];
  }

  // Парсинг содержимого сообщения
  if (message.includes("Failed to pick up a part properly")) {
    const partRegex = /Part (.*)/;
    const partMatch = message.match(partRegex);
    if (partMatch) {
      parsedMessage.type = "PartError";
      parsedMessage.part = partMatch[1];
    }
  } else if (message.includes("The retry count for part pickup was exceeded")) {
    const feederRegex = /Feeder (.*) Part (.*)/;
    const feederMatch = message.match(feederRegex);
    if (feederMatch) {
      parsedMessage.type = "FeederError";
      parsedMessage.feeder = feederMatch[1]; // Обновляем существующее поле feeder
      parsedMessage.part = feederMatch[2];
    }
  } else if (message.includes("Clamp Unlocked")) {
    parsedMessage.type = "ClampEvent";
    parsedMessage.event = "Unlocked";
  } else if (message.includes("Clamp Locked")) {
    parsedMessage.type = "ClampEvent";
    parsedMessage.event = "Locked";
  }

  return {
    datetime,
    message,
    ...parsedMessage
  };
}

// Чтение файла лога
const logFilePath = path.join('C:', 'Users', 'artem', 'OneDrive', 'Рабочий стол', 'SmartCM 421', 'SmartSM', 'Log', 'Operate.log');

fs.readFile(logFilePath, 'utf8', (err, data) => {
  if (err) throw err;

  // Разделение данных на строки и фильтрация пустых строк
  const lines = data.split('\n').filter(line => line.trim() !== '');
  
  // Парсинг каждой строки и фильтрация null значений
  const parsedLogs = lines.map(parseLogLine).filter(log => log !== null);

  // Запись JSON в файл
  const jsonFilePath = path.join('D:', 'SmtMaks', 'MaterialUI', 'public', 'Operate.json');
  fs.writeFile(jsonFilePath, JSON.stringify(parsedLogs, null, 2), 'utf8', err => {
    if (err) throw err;
    console.log('JSON файл сгенерирован успешно.');
  });
});
