const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, './config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

module.exports = configData;
