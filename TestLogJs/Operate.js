const fs = require('fs');
const path = require('path');

// Функция для парсинга строки лога
function parseLogLine(line) {

  const regex = /(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2}:\d{2}) (.*)/;
  const match = line.match(regex);
  if (!match) return null;

  const [, date, time, message] = match;
  const datetime = `${date} ${time}`;

  // Парсинг содержимого сообщения
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
    datetime,
    message,
    ...parsedMessage
  };
}

// Чтение файла лога
const logFilePath = path.join('C:', 'Users', 'artem', 'OneDrive', 'Рабочий стол', 'SmartCM 421', 'SmartSM', 'Log', 'Operate.log');
fs.readFile(logFilePath, 'utf8', (err, data) => {
  if (err) throw err;

  const lines = data.split('\n').filter(line => line.trim() !== '');
  const parsedLogs = lines.map(parseLogLine).filter(log => log !== null);

  // Запись JSON в файл
  const jsonFilePath = path.join('D:', 'SmtMaks', 'MaterialUI', 'public', 'Operate.json');
  fs.writeFile(jsonFilePath, JSON.stringify(parsedLogs, null, 2), 'utf8', err => {
    if (err) throw err;
    console.log('JSON файл сгенерирован успешно.');
  });
});
