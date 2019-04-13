require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



var userCommand = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


///////////////////////////////////////////////////Spotify Function of Liri///////////////////////////////
if (userCommand === "spotify-this-song") {
  if (!userInput) {
    var songName = "The Sign";
  }
   else {
    var songName = userInput;
    spotify
      .search({ type: 'track', query: songName })
      .then(function (data) {

        var showData = [
          "Artist name: " + data.tracks.items[0].artists[0].name,
          "Song name: " + data.tracks.items[0].name,
          "Preview link: " + data.tracks.items[0].preview_url,
          "Album title: " + data.tracks.items[0].album.name,
        ].join("\n\n");

        console.log(showData);
      })
      .catch(function (err) {
        console.log(err);
      });

  }
}
/////////////////////////////////////////////OMDB Function of Liri////////////////////////////////////////////////////////
else if (userCommand === "movie-this") {
  if (!userInput) {
    var movieName = "Mr. Nobody";
  } else {
    var movieName = userInput;
  }
  var URL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

  axios.get(URL).then(
    function (response) {
   
    var showData = [
      "Title of the movie: " + response.data.Title,
      "Release year: " + response.data.Year,
      "IMDB rating: " + response.data.imdbRating,
      "Rotten Tomato rating: " + response.data.Ratings[1].Value,
      "Produced in: " + response.data.Country,
      "Language: " + response.data.Language,
      "Plot: " + response.data.Plot,
      "Actors: " + response.data.Actors,
    ].join("\n\n");
    console.log(showData);
  });
}

///////////////////////////////////////////////Bands In Town Function of Liri/////////////////////////////////////////////
else if (userCommand === "concert-this") {
  var artist = userInput;
  var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  axios.get(URL).then(
    function (response) {

      for (var i = 0; i < response.data.length; i++) {
        
        if (response.data[i].venue.region == "") {
          location = response.data[i].venue.country;
        }
        else {
          location = response.data[i].venue.region;
        }
       
        var showData = [
          "Name of venue: " + response.data[i].venue.name,
          "Venue Location: " + response.data[i].venue.city,
          "Date of event: " + moment(response.data[i].datetime).format("dddd, MM/DD/YYYY"),
        ].join("\n\n");
        console.log(showData);
      }

    }
  )
}
//////////////////////////////////////////Do What It Says Function of Liri/////////////////////////////////
else if (userCommand == 'do-what-it-says') {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    else{
    var dataArr = data.split(",");
    userCommand = dataArr[0];
    songName = dataArr[1];
    spotify
      .search({ type: 'track', query: songName })
      .then(function (data) {

        var showData = [
          "Artist name: " + data.tracks.items[0].artists[0].name,
          "Song name: " + data.tracks.items[0].name,
          "Preview link: " + data.tracks.items[0].preview_url,
          "Album title: " + data.tracks.items[0].album.name,
        ].join("\n\n");

        console.log(showData);
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  });
}
