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

class Movie {
  constructor(item) {
      this.title = item.original_title;
      this.overview = item.overview;
      this.averageVotes = item.vote_average;
      this.totalVotes = item.vote_count;
      this.popularity = item.popularity;
      this.releasedOn = item.release_date;
      if (item.poster_path){
          this.imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
      }
  }
  
}






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


app.get('/weather', weatherHandler)
app.get('/movies', moviesHandler)


function weatherHandler(req,res){
  let lat=req.query.lat
  let lon=req.query.lon
  let weatherbackUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BER_API}&lat=${lat}&lon=${lon}`

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


function moviesHandler(req, res) {

  let moviesKey = process.env.MOVIE_API_KEY;
  let movieCityName = req.query.city_name;
  
  const movieBackUrl = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${movieCityName}`;
  
  axios
      .get(movieBackUrl)
      .then(movieResult => {

          let moviesArr = movieResult.data.results.map(item => {
              return new Movie(item);
          })
          res.send(moviesArr);

      })
      .catch(error => {
          res.status(500).send(`error in movie data ${error}`);
      });

};

//http://localhost:8000/weather?city_name=Amman

// app.get('/weather', (req, res) => {
  
//   let searchQuery = req.query.city_name;
//   console.log(searchQuery);
//   let cityData= weatherData.find((item)=>{
//     if (searchQuery.toLowerCase() === item.city_name.toLowerCase()) {
//       return item;
//     };
//   })

//   try{
//     let forecast = cityData.data.map(item=>{
//       return new ForeCast(item);
//     })
//     res.send(forecast)

//   }

//   catch{
//     res.status(500).send('we dont have this city');
//   }
// })



app.get('*', (req, res) => {
  res.status(404).send('Something went wrong');
});



app.listen(process.env.PORT) // kick start the express server to work