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

//this one works so saving it here

// This route creates a playlist called "Test Nodejs" for the connected user
// router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
//   res.spotifyApi
//     .createPlaylist(req.user.spotifyId, "Test Nodejs")
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => next(err));
// });

// This route creates a playlist called "Test Nodejs" for the connected user
// router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
//   res.spotifyApi
//     .createPlaylist(req.user.spotifyId, "Test Nodejs")
//     .then(data => {
//       let id = JSON.stringify(data.body.id);
//       console.log("here is the id" + id);
//       return res.spotifyApi.addTracksToPlaylist(id, [
//         "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
//         "spotify:track:1301WleyT98MSxVHPZCA6M"
//       ]);
//     })
//     .catch(err => next(err))
//     .then(
//       function(data) {
//         console.log("Added tracks to playlist!");
//       },
//       function(err) {
//         console.log("Something went wrong!", err);
//       }
//     );
// });

router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi
    .createPlaylist(req.user.spotifyId, "Test Nodejs")
    .then(data => {
      res.json(data);
      // let id = JSON.stringify(data.body.id);
      // console.log("here is the id" + id);
    })
    .catch(err => next(err))
    .addTracksToPlaylist("37C65EaNLktZKFiNpZHOfm", [
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

//how to pass id to the next function...

router.post(
  "/playlists/tracks",
  initSpotifyWithLoggedInUser,
  (req, res, next) => {
    res.spotifyApi
      .addTracksToPlaylist("37C65EaNLktZKFiNpZHOfm", [
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
  }
);

module.exports = router;
