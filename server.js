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
			// console.log(jsonData,'jsondata.....')

			// {
			// 	"modal": {
			// 	  "firstname": "devanshu",
			// 	  "lastname": "sharma",
			// 	  "select": "Work",
			// 	  "id": "b9yl148yo"
			// 	},
			// 	"value": []
			//   }


			let updatedData=[];
if(jsonData.length>0){
	console.log('inside json data')
	for(let i=0;i<jsonData.length;i++){
		
		if(jsonData[i].modal.id==modal.id){
			let objValue=value[0];
			
			console.log('inside id match',updatedData,i,objValue)

			 jsonData[i].value.push(objValue);
			 updatedData.push(...jsonData)
			 return updatedData;
		}
		// else if(jsonData[i].modal.id!=modal.id){
		// 	console.log('elsecase working')
		// 	jsonData.push({ modal, value })
		// 	 updatedData.push(...jsonData);
		// 	 console.log(jsonData,'jsondata....')
		// 	 console.log(updatedData,'update....')
		// 	//  return updatedData;
		// }
		
	}
}
else{
	console.log('outside else case')
	jsonData.push({ modal, value })
	 updatedData.push(...jsonData);
	 console.log(updatedData,'elsecase',jsonData)
}


	
	

			// if (modal) {
                
            //     updatedData = jsonData.concat({ modal, value });
			// 	console.log(updatedData,'updated dayta....')
            // } else {
                
            //     updatedData = jsonData.concat(
                    
            //         Array.isArray(value) ? value : []
            //     );
            // }
			// const updatedData = jsonData.concat({ modal, value });
			// const updatedData = jsonData.concat((Array.isArray(modal) ? modal : []), (Array.isArray(value) ? value : []));


		
// console.log(updatedData,'above write')
			fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (writeErr) => {
				if (writeErr) {
					console.error('Error writing to file:', writeErr);
					res.status(500).send('Error writing to file');
				} else {
					res.send('Data written to file successfully');
				}
			});
		} catch (parseError) {
			console.log(parseError,'parseError........')
		
			res.status(500).send('Error parsing existing JSON');
		}
	});
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
