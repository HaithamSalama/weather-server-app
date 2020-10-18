// Setup empty JS object to act as endpoint for all routes
weatherData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
/* Dependencies */
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
});

// GET route
app.get('/allWeatherData', sendWeatherData);
function sendWeatherData(req, res)  {
  console.log('GET request received');
  res.send(weatherData);
}

// POST route
app.post('/addWeatherData', callBack)
function callBack(req, res) {
  let weatherData= {
    date: req.body.date,
    temp: req.body.temp,
    fealnig: req.body.fealnig
  }
  addWeatherData.push(weatherData);
  res.send(true);
};