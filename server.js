const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());
const filePath = './Data.json';
app.get('/read-json', (req, res) => {
	try{
	const fielData= fs.readFile('./Data.json', 'utf8',(readFile,readData)=>{
		console.log(readData,'readData')
		console.log(readFile,'readFile')
		res.status(200).send(readData)
	
	});
}catch(err){
	
	res.status(500).send(err);
}
});

app.post('/write-json', (req, res) => {

	const {modal,value} = req.body;
	
	const filePath = './Data.json';

	fs.readFile(filePath, 'utf8', (readErr, existingData) => {
		if (readErr) {
			console.error('Error reading file:', readErr);
			res.status(500).send('Error reading file');
			return;
		}

		try {
			const jsonData = existingData ? JSON.parse(existingData) : [];
			console.log(modal,'modal1234')



			if (modal) {
                
                updatedData = jsonData.concat({ modal, value });
            } else {
                
                updatedData = jsonData.concat(
                    Array.isArray(modal) ? modal : [],
                    Array.isArray(value) ? value : []
                );
            }
			// const updatedData = jsonData.concat({ modal, value });
			// const updatedData = jsonData.concat((Array.isArray(modal) ? modal : []), (Array.isArray(value) ? value : []));


		

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
