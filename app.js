const express = require("express")
require('dotenv').config();
const https = require("https")
const bodyparser = require("body-parser")

const app = express()

app.use(bodyparser.urlencoded({extended : true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){

 

const city =  req.body.cityName;
const Apikey = process.env.API_KEY 
const units = "metric"

 const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid=" + Apikey; 
 https.get(url,function(response){
     console.log(response.statusCode)
     response.on("data",function(data){
          const weatherData = JSON.parse(data)
          console.log(weatherData)
         const temp =  weatherData.main.temp
         const discription = weatherData.weather[0].description
         const icon = weatherData.weather[0].icon
         const url = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
         
         res.write("<h1>temp in "+city+" is " + temp + " degreee celcius</h1>");
         res.write("<p>weather here in "+ city  +" is like "+ discription +"</p>");
         res.write("<img src="+ url+">");
         res.send();
     })
 })


})









app.listen(3000,function(){

    console.log("your server 3000 is working")
})