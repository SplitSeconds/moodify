const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const { isLoggedIn, initSpotifyWithLoggedInUser } = require("../middlewares");

router.get("/me", initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi
    .getMe()
    .then(data => {
      console.log("DEBUG data", data);
      res.json(data);
    })
    .catch(err => {
      console.log("DEBUG err", err);
    });
});

router.get("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi
    .getUserPlaylists(req.user.spotifyId)
    .then(data => {
      res.json(data.body.items);
    })
    .catch(err => {
      console.log("DEBUG err", err);
    });
});

// This route creates a playlist called "Test Nodejs" for the connected user
router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi
    .createPlaylist(req.user.spotifyId, "Test Nodejs")
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err));
});

router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi
    .createPlaylist(req.user.spotifyId, "Test Nodejs")
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err));
});

router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi
    .addTracksToPlaylist("5ieJqeLJjjI8iJWaxeBLuK", [
      "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
      "spotify:track:1301WleyT98MSxVHPZCA6M"
    ])
    .then(
      function(data) {
        console.log("Added tracks to playlist!");
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
});

//This route will create a playlist called whatever name the user sends

// router.post('/playlists', initSpotifyWithLoggedInUser, (req, res, next) => {
//   res.spotifyApi.createPlaylist(req.user.spotifyId, req.body.name)
//     .then(data => {
//       res.json(data)
//     })
//     .catch(err => next(err))
// })

//This route will add tracks to playlist...maybe at the same time

// router.post("/playlists", (req, res, next) => {
//   res.spotifyApi
//     .addTracksToPlaylist("5ieJqeLJjjI8iJWaxeBLuK", [
//       "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
//       "spotify:track:1301WleyT98MSxVHPZCA6M"
//     ])
//     .then(
//       function(data) {
//         console.log("Added tracks to playlist!");
//       },
//       function(err) {
//         console.log("Something went wrong!", err);
//       }
//     );
// });

module.exports = router;
