var Twitter = require('twitter');
var express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
var app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', function(req,res) {
  getTrends(req,res)
})
app.get('/locations', function(req,res) {
  console.log("find places")
  getLocations(req,res)
})

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

function getTrends(req,res) {
  var params = req.query
  client.get('trends/place.json', params, function(error, tweets, response){
    res.json(tweets[0])

  })
}

function getLocations(req,res) {
  client.get('trends/available.json', function(error, locations, response){
    res.json(locations)
  })
}

app.listen(process.env.PORT||3000)
