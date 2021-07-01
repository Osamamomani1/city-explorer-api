let Movie= require ('../models/Movie.model');
let Cache= require ('../utils/movieCache')

const axios = require('axios'); // require the package

let moviecache= new Cache();
moviecache['data']= []


let y2 ;
let dateYear2;

let moviesHandler=(req, res)=>{

    let moviesKey = process.env.MOVIE_API_KEY;
    let movieCityName = req.query.city_name;
    let moviesArr= []
    let y = new Date();
    let dateYear = y.getFullYear();
    if (movieCityName) {
       if (moviecache.data.length && dateYear === dateYear2) {
        moviesArr = moviecache.data.map(item => {
            return new Movie(item);})
            res.send(moviesArr);
            console.log('come from CAAAAAshe');
                
       }else {

        const movieBackUrl = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${movieCityName}`;
    
        axios
            .get(movieBackUrl)
            .then(movieResult => {
                  moviesArr = movieResult.data.results.map(item => {
                    return new Movie(item);
                })
                moviecache['data']=movieResult.data.results
                res.send(moviesArr);
                console.log('come from API');
                y2 = new Date();
                dateYear2 = y2.getFullYear();
            })
            .catch(error => {
                res.status(500).send(`error in movie data ${error}`);
            });

       } 
    }
    
  
  }

  module.exports=moviesHandler

 