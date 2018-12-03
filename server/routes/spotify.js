const express = require("express");
const router = express.Router();
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

router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi.createPlaylist(req.user.spotifyId, "Nele Test 2").then(data => {
    let playlistId = data.body.id;
    return res.spotifyApi.addTracksToPlaylist(playlistId, [
      "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
      "spotify:track:1301WleyT98MSxVHPZCA6M"
    ]);
  });
});

module.exports = router;
