const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());

app.get('/read-json	', (req, res) => {
	res.send('Server is on time high');
});

app.post('/write-json', (req, res) => {
	const { value, modal } = req.body;
	const filePath = './data.json';

	fs.readFile(filePath, 'utf8', (readErr, existingData) => {
		if (readErr) {
			console.error('Error reading file:', readErr);
			res.status(500).send('Error reading file');
			return;
		}

		try {
			const jsonData = existingData ? JSON.parse(existingData) : [];
			const updatedData = [
				...jsonData,
				...(Array.isArray(modal) ? modal : []),
				...(Array.isArray(value) ? value : [])
			];

			fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (writeErr) => {
				if (writeErr) {
					console.error('Error writing to file:', writeErr);
					res.status(500).send('Error writing to file');
				} else {
					res.send('Data written to file successfully');
				}
			});
		} catch (parseError) {
			console.error('Error parsing existing JSON:', parseError);
			console.error('Existing JSON data:', existingData);
			res.status(500).send('Error parsing existing JSON');
		}
	});
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
