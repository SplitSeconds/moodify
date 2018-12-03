const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const SpotifyWebApi = require("spotify-web-api-node");
const { isLoggedIn, initSpotifyWithLoggedInUser } = require("../middlewares");

router.get("/me", initSpotifyWithLoggedInUser, (req, res, next) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(req.user.accessToken);
  spotifyApi.setRefreshToken(req.user.refreshToken);
  spotifyApi
    .getMe()
    .then(data => {
      console.log("DEBUG data", data);
      res.json(data);
    })
    .catch(err => {
      console.log("DEBUG err", err);
    });
});

router.get("/playlists", isLoggedIn, (req, res, next) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(req.user.accessToken);
  spotifyApi.setRefreshToken(req.user.refreshToken);
  spotifyApi.getUserPlaylists(req.user.spotifyId).then(data => {
    res.json(data.body.items);
  });
});

router.get("/songs", (req, res, next) => {
  let { danceabilityMin } = req.query;
  console.log("you have called get songs in spotify.js");
  Song.find()
    .then(songs => {
      let filteredSongs = songs.filter(song => {
        return song.danceability >= danceabilityMin;
      });
      res.json(filteredSongs);
    })
    .catch(err => next(err));
});

router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
  let danceabilityWeight = 1;
  let { danceability, tempo } = req.body;
  Song.find()
    .lean()
    .then(songs => {
      let songUris = songs
        .map(song => {
          // a score is added, the closer score and 0 are, the better it is
          let score =
            danceabilityWeight * Math.abs(song.danceability - danceability) +
            Math.abs(song.tempo - tempo);
          return {
            ...song,
            score: score
          };
        })
        .sort((a, b) => a.score - b.score) // sort by score
        .slice(0, 10) // takes the 10 first elements
        .map(song => song.uri); // extract uris

      return res.spotifyApi
        .createPlaylist(req.user.spotifyId, "test maxence " + danceability)
        .then(data => {
          let playlistId = data.body.id;
          return res.spotifyApi.addTracksToPlaylist(playlistId, songUris);
        })
        .then(data => {
          res.json(data);
        });
    })
    .catch(err => next(err));
});

router.post("/playlists/toptracks", (req, res, next) => {
  console.log("you made it!");
  res.spotifyApi
    .getPlaylist("5ieJqeLJjjI8iJWaxeBLuK")
    .then(
      function(data) {
        console.log("Some information about this playlist", data.body);
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    )
    .catch(err => next(err));
});

// This route creates a playlist called "Test Nodejs" for the connected user
// router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
//   // const spotifyApi = new SpotifyWebApi();
//   // // spotifyApi.setAccessToken(req.user.accessToken);
//   // // spotifyApi.setRefreshToken(req.user.refreshToken);
//   res.spotifyApi
//     .createPlaylist(req.user.spotifyId, "Another Test")
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => next(err));
// });

module.exports = router;
