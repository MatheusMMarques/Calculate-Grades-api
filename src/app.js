const express = require('express');
const { google } = require('googleapis');
const auth = require('./auth');

const app = express();
const port = 3000;

app.get('/calculate-grades', async (req, res) => {
    try {
        console.log('Request received for calculating grades.');

        const sheets = google.sheets({ version: 'v4', auth });

        // Function to access the spreadsheet
        async function getSheetData() {
            console.log('Accessing the spreadsheet data.');

            const spreadsheetId = '1ML5bPmpvJg-H6izS6h1A6twDmUhBPwE4WZ9p0KQ_ixs';
            const range = 'B4:F27';

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });

            const sheetData = response.data.values;

            console.log('Data read from the spreadsheet:', sheetData);

            return response.data.values;
        }

        // Function to calculate grades
        function calculateGrades(data) {
            console.log('Calculating grades for each student.');

            const results = [];
            const totalClasses = 60; // Total number of classes
        
            data.forEach((row) => {
                const student = {
                    name: row[0],
                    attendance: parseInt(row[1]),
                    p1: parseFloat(row[2]),
                    p2: parseFloat(row[3]),
                    p3: parseFloat(row[4]),
                };
        
                console.log('Student data: ', student);
        
                // Calculating Average
                const average = (student.p1 + student.p2 + student.p3) / 3;
        
                // Checking for attendance
                if (student.attendance > 0.25 * totalClasses) {
                    student.situation = 'Failed due to Absence';
                    student.naf = 0; // Not applicable
                } else {
                    // Checking situations based on grade rules
                    if (average < 50) {
                        student.situation = 'Failed due to Grade';
                        student.naf = 0; // Not applicable NAF
                    } else if (average >= 50 && average < 70) {
                        student.situation = 'Final Exam';
                        // Calculating Grade for final approval (NAF)
                        student.naf = Math.max(0, 100 - average);
                    } else {
                        student.situation = 'Approved';
                        student.naf = 0; // Filling the NAF field with 0 for cases other than "Final Exam"
                    }
                }
        
                results.push(student);
            });
        
            return results;
        }

        // Function to update the spreadsheet with results
        async function updateSheet(results) {
            console.log('Updating the spreadsheet with calculated grades.');

            const spreadsheetId = '1ML5bPmpvJg-H6izS6h1A6twDmUhBPwE4WZ9p0KQ_ixs';
            const range = 'G4:H27';

            const values = results.map((student) => [student.situation, student.naf]);

            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                resource: { values },
            });
        }

        // Calling the functions to perform the logic
        const data = await getSheetData();
        const results = calculateGrades(data);
        await updateSheet(results);

        console.log('Grades calculated and updated successfully.');

        res.send('Grades calculated and updated successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error calculating and updating grades');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
