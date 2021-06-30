
('/weather', (req, res) => {
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



let Forcast=class ForeCast{
    constructor(item){
        this.date=item.valid_date ,
        this.description=`Low of : ${item.low_temp} and a high of ${item.max_temp} with a ${item.weather.description}  `
    }
  }


  module.exports=Forcast 