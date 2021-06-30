let Movie= require ('../models/Movie.model');
const axios = require('axios'); // require the package

let moviesHandler=(req, res)=>{

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
  
  }

  module.exports=moviesHandler

 