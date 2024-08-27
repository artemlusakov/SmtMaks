const fs = require('fs');
const path = require('path');

// Function to parse log lines
function parseLogLine(line) {
    const regex = /(\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) : (\d+) : (.+)/;
    const match = line.match(regex);
    if (!match) return null;

    const [, datetime, id, message] = match;
    const date = datetime.split(' ')[0].split('/').reverse().join('-'); // Convert DD/MM to YYYY-MM-DD
    const time = datetime.split(' ')[1];

    // Further parsing based on message content
    let parsedMessage;
    if (message.includes("Find Model")) {
        const modelRegex = /Camera=(\d+), Model=(\d+), ErrorCode=([a-fA-F0-9]+)/;
        const modelMatch = message.match(modelRegex);
        if (modelMatch) {
            parsedMessage = {
                type: "Model",
                camera: parseInt(modelMatch[1], 10),
                model: parseInt(modelMatch[2], 10),
                errorCode: modelMatch[3]
            };
        }
    } else if (message.includes("LLAutoTeachError")) {
        const errorRegex = /CamID (\d+), ErrorCode (\d+)/;
        const errorMatch = message.match(errorRegex);
        if (errorMatch) {
            parsedMessage = {
                type: "Error",
                camId: parseInt(errorMatch[1], 10),
                errorCode: parseInt(errorMatch[2], 10)
            };
        }
    }

    return {
        datetime: `${date}T${time}`,
        id,
        ...parsedMessage
    };
}

const jsonFilePath = path.join(__dirname, 'VisionLog.json');

// Read log file
const logFilePath = path.join(__dirname, 'VisionLog.js');
fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    const lines = data.split('\n').filter(line => line.trim() !== '');
    const parsedLogs = lines.map(parseLogLine).filter(log => log !== null);

    // Write JSON to file
const jsonFilePath = path.join(__dirname, 'VisionLog.json');
    fs.writeFile(jsonFilePath, JSON.stringify(parsedLogs, null, 2), 'utf8', err => {
        if (err) throw err;
        console.log('JSON file generated successfully.');
    });
});
