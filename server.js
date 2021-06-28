const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
const weatherData = require('./data/weather.json')
const axios = require('axios'); // require the package

// // inside your callback function
// axios.get(url).then(response => response.data).catch(error => console.log(error));

app.use(cors()) // after you initialize your express app instance
// a server endpoint 

app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})

app.get ('/weather/:name', (req,res)=>{
 if(req.params.name.toLowerCase() === 'seattle'){
    res.json(weatherData.find(({ city_name }) => city_name === 'Seattle'))
 }
  else if (req.params.name.toLowerCase() === 'amman'){
    res.json(weatherData.find(({ city_name }) => city_name === 'Amman'))
  }
  else if (req.params.name.toLowerCase() === 'paris'){
    res.json(weatherData.find(({ city_name }) => city_name === 'Paris'))
  }
  else{res.status(500).send('we dont have this city');}
})


app.get('*', (req, res) => {
    res.send('Something went wrong');
});

app.get('/weather',(req,res)=>{
    const arrOfdata = weatherData.map(cast=> new ForeCast(cast));
    res.send(arrOfdata)
});





// let forecasts = cityData.data.map(item => {
//     return new ForeCast(item);
// })
// res.send(forecasts);


class ForeCast{
    constructor(weatherData){
        this.date=weatherData.moonrise_ts ,
        this.description=`Low of : ${weatherData.low_temp} and a high of ${weatherData.max_temp} with a  `
    }
}





app.listen(process.env.PORT) // kick start the express server to work