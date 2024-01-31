const { google } = require('googleapis');
const path = require('path');

const keyFilePath = path.join(__dirname, 'calculate-grades-api-f2122ee1ea48.json')

const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

module.exports = auth;