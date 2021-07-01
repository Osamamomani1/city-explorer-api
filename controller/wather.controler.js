let ForeCast= require ('../models/Weather.model');
let Cache= require ('../utils/cache')
const axios = require('axios'); // require the package


let cache=new Cache
cache['data']= []
// cache['recent']= Date.now()

let d2 ;
let dateDay2;

// 
let weatherHandler=(req,res)=>{
    let lat=req.query.lat
    let lon=req.query.lon
    let name=req.query.name
    let forecastArr= []
    let d = new Date();
    let dateDay = d.getDate();
    
    if (name) {
        if (cache.data.length !==0 && dateDay === dateDay2) {
            forecastArr =cache.data.map(item => {
                    return new ForeCast(item);
                })
                res.json(forecastArr);
                console.log('come from CASH');
                console.log(dateDay);
                
        }else {

            let weatherbackUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BER_API}&city=${name}`
  
            axios.get(weatherbackUrl).then(result1 => {
          
                 forecastArr = result1.data.data.map(item => {
                    return new ForeCast(item);
                })
                cache['data']=result1.data.data;    
                res.json(forecastArr);
                console.log('come from API');
                 d2 = new Date();
                dateDay2 = d2.getDate();
                console.log('come from API');
                console.log(dateDay2);

            })
            .catch(error => {
                res.status(500).send(`error in weather data ${error}`);
            });
            
        }
    }
    
  }

  
module.exports=weatherHandler