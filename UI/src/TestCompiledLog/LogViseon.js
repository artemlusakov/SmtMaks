const fs = require('fs');
const path = require('path');

// Регулярное выражение для разбора строки лога
const logPattern = /(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2}:\d{2}) : (\d+) : (.*)/;

// Функция для разбора строки лога
function parseLogLine(line) {
    const match = logPattern.exec(line);
    if (match) {
        const [_, date, time, msgId, msgText] = match;
        // Дополнительная обработка msgText для извлечения деталей сообщения
        const detailsMatch = /Find ModelN?|VisFrame|Vision Ver|dll constructor|CamID (.*)/.exec(msgText);
        if (detailsMatch) {
            const msgType = detailsMatch[0];
            let detailsDict;
            if (msgType.startsWith("Find")) {
                const keyValues = msgText.split(", ").map(kv => kv.split("="));
                detailsDict = Object.fromEntries(keyValues.map(([k, v]) => [k.trim(), v.trim()]));
            } else if (msgType === "CamID") {
                const keyValues = msgText.split(" = ");
                detailsDict = Object.fromEntries(keyValues.reduce((acc, val, i) => {
                    if (i % 2 === 0) acc.push([val.trim(), parseFloat(keyValues[i + 1].trim())]);
                    return acc;
                }, []));
            } else {
                detailsDict = { message: msgText.trim() };
            }
            return {
                date,
                time,
                msgId,
                msgType,
                details: detailsDict
            };
        }
    }
    return null;
}

// Чтение файла лога и парсинг в JSON
const logFilePath = path.join(__dirname, 'VisionLog.log');
const jsonObjects = [];

fs.readFile(logFilePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    lines.forEach(line => {
        const jsonObj = parseLogLine(line);
        if (jsonObj) {
            jsonObjects.push(jsonObj);
        }
    });

    // Сохранение JSON объектов в файл
    fs.writeFile(path.join(__dirname, 'VisionLog.json'), JSON.stringify(jsonObjects, null, 4), err => {
        if (err) throw err;
        console.log('JSON файл успешно создан!');
    });
});