const express = require("express")
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node');
const { isLoggedIn } = require('../middlewares');


router.get('/me', isLoggedIn, (req, res, next) => {
  const spotifyApi = new SpotifyWebApi()
  spotifyApi.setAccessToken(req.user.accessToken)
  spotifyApi.setRefreshToken(req.user.refreshToken)

  spotifyApi.getMe()
    .then(data => {
      console.log('DEBUG data', data);
      res.json(data)
    })
    .catch(err => {
      console.log('DEBUG err', err);
    })
})

router.get('/playlists', isLoggedIn, (req, res, next) => {
  const spotifyApi = new SpotifyWebApi()
  spotifyApi.setAccessToken(req.user.accessToken)
  spotifyApi.setRefreshToken(req.user.refreshToken)

  spotifyApi.getUserPlaylists(req.user.spotifyId)
    .then(data => {
      res.json(data.body.items)
    })
})

// This route creates a playlist called "Test Nodejs" for the connected user
router.post('/playlists', isLoggedIn, (req, res, next) => {
  const spotifyApi = new SpotifyWebApi()
  spotifyApi.setAccessToken(req.user.accessToken)
  spotifyApi.setRefreshToken(req.user.refreshToken)

  spotifyApi.createPlaylist(req.user.spotifyId, "Test Nodejs")
    .then(data => {
      res.json(data)
    })
    .catch(err => next(err))
})

module.exports = router
