const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());
const filePath = "./Data.json";
app.get("/read-json", (req, res) => {
  try {
    const fielData = fs.readFile(
      "./Data.json",
      "utf8",
      (readFile, readData) => {
        res.status(200).send(readData);
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/write-json", (req, res) => {
  const { modal, value } = req.body;

  const filePath = "./Data.json";

  fs.readFile(filePath, "utf8", (readErr, existingData) => {
    if (readErr) {
      console.error("Error reading file:", readErr);
      res.status(500).send("Error reading file");
      return;
    }

    try {
      const jsonData = existingData ? JSON.parse(existingData) : [];
      console.log(jsonData.length, "jsonData length------");
      function getJsonValue() {
        let updatedData = [];
        if (jsonData.length > 0) {
			for ( let i = 0; i < jsonData.length; i++ ) {
				if ( jsonData[i].modal.id == modal.id ) {
					let objValue = value[0];
					console.log( "inside id match--------------------" );
					jsonData[i].value.push( objValue );
					updatedData.push( ...jsonData );
					return updatedData;
				}
			} 
              jsonData.push({ modal, value });
              updatedData.push(...jsonData);
              return updatedData;
          }
         else {
          console.log("outside else case value ------");
          jsonData.push({ modal, value });
          updatedData.push(...jsonData);
          return updatedData;
        }
      }

      const updatedJsonData = getJsonValue();

      fs.writeFile(
        filePath,
        JSON.stringify(updatedJsonData, null, 2),
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing to file:", writeErr);
            res.status(500).send("Error writing to file");
          } else {
            res.send("Data written to file successfully");
          }
        }
      );
    } catch (parseError) {
      console.log(parseError, "parseError........");

      res.status(500).send("Error parsing existing JSON");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
