
let movie=class Movie {
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
  

 module.exports=movie