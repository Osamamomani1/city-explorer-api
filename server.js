'use strict'

const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
const axios = require('axios'); // require the package
const weatherHandler=require('./controller/wather.controler')
const moviesHandler=require('./controller/movie.controler')

app.use(cors()) // after you initialize your express app instance


app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})




app.get('/weather', weatherHandler)

app.get('/movies', moviesHandler)



app.get('*', (req, res) => {
  res.status(404).send('Something went wrong');
});



app.listen(process.env.PORT) // kick start the express server to work





// http://localhost:8000/weather?city_name=Amman



// function weatherHandler(req,res){
//   let lat=req.query.lat
//   let lon=req.query.lon
//   let weatherbackUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BER_API}&lat=${lat}&lon=${lon}`

//   axios.get(weatherbackUrl).then(result1 => {

//       let forecastArr = result1.data.data.map(item => {
//           return new ForeCast(item);
//       })
//       res.json(forecastArr);

//   })
//   .catch(error => {
//       res.status(500).send(`error in weather data ${error}`);
//   });
// }


// a server endpoint 
// // inside your callback function
// axios.get(url).then(response => response.data).catch(error => console.log(error));