const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to handle JSON data from requests
app.use(express.json());

// Serve the static HTML file
app.get('/', (req, res) => {
  const htmlFilePath = path.resolve(__dirname, 'public', 'index.html');
  res.sendFile(htmlFilePath);
});



// Endpoint to receive form data and save it to a JSON file
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Set file path for the JSON file
  const jsonFilePath = path.resolve(__dirname, 'location.json');

  // Check if file exists and read current data
  let storedData = [];
  if (fs.existsSync(jsonFilePath)) {
    const fileContents = fs.readFileSync(jsonFilePath, 'utf8');
    storedData = JSON.parse(fileContents);
  }

  // Append new form data to the existing data
  storedData.push(formData);

  // Write the updated data back to the JSON file
  fs.writeFileSync(jsonFilePath, JSON.stringify(storedData, null, 2), 'utf8');

  // Respond to the client with success message
  res.status(200).json({ message: 'Your data has been successfully saved!', savedData: formData });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});


