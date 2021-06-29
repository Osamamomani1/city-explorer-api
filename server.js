'use strict'

const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
const weatherData = require('./data/weather.json')
const axios = require('axios'); // require the package
app.use(cors()) // after you initialize your express app instance
// a server endpoint 
// // inside your callback function
// axios.get(url).then(response => response.data).catch(error => console.log(error));

app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})



class ForeCast{
  constructor(item){
      this.date=item.valid_date ,
      this.description=`Low of : ${item.low_temp} and a high of ${item.max_temp} with a ${item.weather.description}  `
  }
}

//http://localhost:8000/weather?city_name=Amman

app.get('/weather', (req, res) => {
  let searchQuery = req.query.city_name;
  console.log(searchQuery);
  let cityData= weatherData.find((item)=>{
    if (searchQuery.toLowerCase() === item.city_name.toLowerCase()) {
      return item;
    };
  })

  try{
    let forecast = cityData.data.map(item=>{
      return new ForeCast(item);
    })
    res.send(forecast)

  }

  catch{
    res.status(500).send('we dont have this city');
  }
})



app.get('*', (req, res) => {
  res.status(404).send('Something went wrong');
});



app.listen(process.env.PORT) // kick start the express server to work