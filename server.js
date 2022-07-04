// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//dependancies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,listening);
function listening (){
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}

// GET route for projectData
app.get('/getData',function(req , res){
  res.send(projectData);
});

// POST route to add data to projectData
app.post('/addData', function(req, res){
  projectData['temperature'] = req.body.temperature;
  projectData['date'] = req.body.date;
  projectData['user_response'] = req.body.user_response;
  console.log(projectData);
});
