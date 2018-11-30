const express = require("express")
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node');
const { isLoggedIn, initSpotifyWithLoggedInUser } = require('../middlewares');


router.get('/me', initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi.getMe()
    .then(data => {
      console.log('DEBUG data', data);
      res.json(data)
    })
    .catch(err => {
      console.log('DEBUG err', err);
    })
})

router.get('/playlists', initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi.getUserPlaylists(req.user.spotifyId)
    .then(data => {
      res.json(data.body.items)
    })
    .catch(err => {
      console.log('DEBUG err', err);
    })
})

// This route creates a playlist called "Test Nodejs" for the connected user
router.post('/playlists', initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi.createPlaylist(req.user.spotifyId, "Test Nodejs")
    .then(data => {
      res.json(data)
    })
    .catch(err => next(err))
})

module.exports = router
