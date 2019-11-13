require("dotenv").config();
var request = require("request");
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var userInputCommand = "";
var userInputCommandDetails = "";
userInputCommand = process.argv[2];
userInputCommandDetails = process.argv[3];

function spotifythissong()  {
  
  if((userInputCommandDetails == "") || (typeof userInputCommandDetails == "undefined"))
  {
    spotify.search
    ({
      type: 'album', 
      query: 'The Sign', 
      limit: 1
    },
    function(err,data)
    { 
      if(err)
      {
        return console.log('Error occurred: ' + err);
      } 
            
      console.log("Artist Name : ", JSON.stringify(data.albums.items[0].artists[0].name));
      console.log("Album Name : ",JSON.stringify(data.albums.items[0].name));
      console.log("Type : ", JSON.stringify(data.albums.items[0].type));       
          
  
    });
  }
  else
  {
    spotify.search
    ({
      type: 'track',
      query: userInputCommandDetails, 
      limit: 1
    }, 
    function(err,data)
    { 
      if(err)
      {
        return console.error('Error occurred: ' + err);
      }     
      
      console.log("Artist       : ", JSON.stringify(data.tracks.items[0].artists[0].name));
      console.log("Song Name    : ", JSON.stringify(data.tracks.items[0].name));
      console.log("Preview Song : ", JSON.stringify(data.tracks.items[0].preview_url));
      console.log("Album Name   : ", JSON.stringify(data.tracks.items[0].album.name));
      
    
    });
    
  }
};

function concertthis()
{
    var url = 'https://rest.bandsintown.com/artists/' + userInputCommandDetails + '/events?app_id=codingbootcamp';
    request(url, function (error, response, body) 
    {
    console.log(JSON.parse(body));   
     
    //Trying to get the output in an array and display the required data but not yet successfull.
    
    //var dataAPI = JSON.parse(body);
    // console.log("dataAPI***", dataAPI);
    //for (var i = 0; i < dataAPI.length; i++) {
    // var dataDisplay = 
    // [
    // //  "Name of the venue               : " +  dataAPI[i].venue[i].name,
    //   "Venue location                  : " + dataAPI[i].venue[i].city + "," + dataAPI[i].region + "," + dataAPI[i].country,
    //   "Date of the Event(MM/DD/YYYY)   : " + dataAPI[i].datetime,
    // ].join("\n\n");  
    
    // console.log(dataDisplay);
  
    });
};

function moviethis(){
    if((userInputCommandDetails == "") || (typeof userInputCommandDetails == "undefined"))
    {
      userInputCommandDetails = 'Mr. Nobody';
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userInputCommandDetails + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) 
    {
      
      console.log("Movie Title                      : " + JSON.parse(body).Title);  
      console.log("Year Released                    : " + JSON.parse(body).Year);
      console.log("Movie Rating                     : " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomato Rating             : " + JSON.parse(body).Ratings[1].Value);
      console.log("Country where movie was produced : " + JSON.parse(body).Country);
      console.log("Language of the Movie            : " + JSON.parse(body).Language);
      console.log("Plot of the Movie                : " + JSON.parse(body).Plot);
      console.log("Actors of the Movie              : " + JSON.parse(body).Actors);

      
    });
};


function dowhatitsays()
{
    fs.readFile("random.txt", "utf8", function(error, data) 
    {
      
      if (error) {
        return console.log(error);
      }
    
      var fileData = data.split(",");
      
      userInputCommand = fileData[0];
      userInputCommandDetails = fileData[1];
      console.log(userInputCommand,userInputCommandDetails );
      if (userInputCommand === "spotify-this-song"){
        spotifythissong();
      }
      if(userInputCommand === "concert-this")
      {
        concertthis();
        
      }
      
      if(userInputCommand === "movie-this")
      {
        moviethis();
      }
      
    });
} ;


console.log("You are Searching For: " + userInputCommand + " " + userInputCommandDetails);


if (userInputCommand === "spotify-this-song"){
  spotifythissong();
};
if(userInputCommand === "concert-this")
{
  concertthis();
};
 
if(userInputCommand === "movie-this")
{
  moviethis();
};

if(userInputCommand === "do-what-it-says")
{
  dowhatitsays();
   

};




  




