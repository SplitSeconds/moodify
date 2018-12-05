require("dotenv").config();

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Song = require("../models/Song");
const SpotifyWebApi = require("spotify-web-api-node");
const songs = require("./songs.json");
const { isLoggedIn, initSpotifyWithLoggedInUser } = require("../middlewares");

const bcryptSalt = 10;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  URL: "http://localhost:5000/api/spotifycallback-login/callback"
});

// Retrieve an access token.
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body["access_token"]);
    //find by ID and update
    Song.deleteMany()
      .then(() => {
        return Song.create(songs);
      })
      .then(songCreated => {
        // console.log(
        //   `${songCreated.length} song created with the following id:`
        // );
        console.log(songCreated.map(u => u.name));
        let getTrackPromises = songCreated.map(songCreated =>
          spotifyApi.getTrack(songCreated.id)
        );
        Promise.all(getTrackPromises).then(arrayData => {
          for (let i = 0; i < arrayData.length; i++) {
            Song.findByIdAndUpdate(songCreated.id, {
              $set: {
                name: "hi"
                // name: arrayData[i].body.name
              }
            });
            console.log("here are the names " + arrayData[i].body.name);
          }
          console.log(songCreated.map(u => u.name));
        });
        // spotifyApi
        //   .getTrack(songCreated.id)
        //   .then(data => {
        //     console.log("data", data.body);
        //   })
        // .catch(err => console.log("ERROR", err));
      })
      .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect();
      })
      .catch(err => {
        mongoose.disconnect();
        throw err;
      });
  })
  .catch(err => {
    console.log("Something went wrong when retrieving an access token", err);
  });

require("../configs/database");

console.log("Crendentials", {
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});

// Song.deleteMany()
//   .then(() => {
//     return Song.create(songs);
//   })
//   .then(songCreated => {
//     console.log(`${songCreated.length} song created with the following id:`);
//     console.log(songCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     mongoose.disconnect();
//     throw err;
//   });

// let getTrackPromises = songs.map(song => spotifyApi.getTrack(song.id));
// Promise.all(getTrackPromises).then(arrayData => {
//   for (let i = 0; i < arrayData.length; i++) {
//     console.log(arrayData[i].body.name);
//   }
// });
// spotifyApi
//   .getTrack(songs.id)
//   .then(data => {
//     console.log("data", data.body);
//   })
//   .catch(err => console.log("ERROR", err));
