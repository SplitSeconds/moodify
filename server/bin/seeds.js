require("dotenv").config();

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Song = require("../models/Song");
const SpotifyWebApi = require("spotify-web-api-node");
const jsonSongs = require("./songs.json");
const { isLoggedIn, initSpotifyWithLoggedInUser } = require("../middlewares");

const bcryptSalt = 10;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  URL: process.env.BACKEND_URI + "/api/spotifycallback-login/callback"
});

spotifyApi.clientCredentialsGrant().then(data => {
  spotifyApi.setAccessToken(data.body["access_token"]);
  //find by ID and update
  Song.deleteMany()
    .then(() => {
      let getTrackPromises = jsonSongs.map(song =>
        spotifyApi.getTrack(song.id)
      );
      return Promise.all(getTrackPromises);
    })
    .then(results => {
      console.log(`We have ${results.length} spotify songs`);
      console.log(
        "First body results from the spotify API",
        results[0].body.album.images[0].url
      );
      return Song.create(
        jsonSongs.map((jsonSong, i) => ({
          ...jsonSong,
          name: results[i].body.name,
          artists: results[i].body.artists.map(artist => artist.name),
          image: results[i].body.album.images[0].url
        }))
      );
    })
    .then(songDocuments => {
      // console.log(songDocuments);
      // Close properly the connection to Mongoose
      mongoose.disconnect();
    })
    .catch(err => {
      mongoose.disconnect();
      console.log("ERROR", err);
      console.log("Retry the seed a couple a times");
    });
});

require("../configs/database");

console.log("Crendentials", {
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});
