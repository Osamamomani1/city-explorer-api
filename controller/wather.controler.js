let ForeCast= require ('../models/Weather.model');
const axios = require('axios'); // require the package




let weatherHandler=(req,res)=>{
    let lat=req.query.lat
    let lon=req.query.lon
    let name=req.query.name
    let weatherbackUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BER_API}&city=${name}`
  
    axios.get(weatherbackUrl).then(result1 => {
  
        let forecastArr = result1.data.data.map(item => {
            return new ForeCast(item);
        })
        res.json(forecastArr);
  
    })
    .catch(error => {
        res.status(500).send(`error in weather data ${error}`);
    });
  }

  
module.exports=weatherHandler