const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const SpotifyWebApi = require("spotify-web-api-node");
const { isLoggedIn, initSpotifyWithLoggedInUser } = require("../middlewares");

//-------------------------------------------------
//User Profile
//-------------------------------------------------

router.get("/me", initSpotifyWithLoggedInUser, (req, res, next) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(req.user.accessToken);
  spotifyApi.setRefreshToken(req.user.refreshToken);
  spotifyApi
    .getMe()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("DEBUG err", err);
    });
});

//-------------------------------------------------
//Display all user playlists
//-------------------------------------------------

router.get("/playlists", isLoggedIn, (req, res, next) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(req.user.accessToken);
  spotifyApi.setRefreshToken(req.user.refreshToken);
  spotifyApi.getUserPlaylists(req.user.spotifyId).then(data => {
    res.json(data.body.items);
  });
});

//-------------------------------------------------
//User Graph
//-------------------------------------------------
router.get("/playlists/graph", isLoggedIn, (req, res, next) => {
  var arr = [];
  var arrayPass = [];
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(req.user.accessToken);
  spotifyApi.setRefreshToken(req.user.refreshToken);
  spotifyApi
    .getMe()
    .then(data => {
      // console.log(data);
      spotifyApi
        .getMyRecentlyPlayedTracks({
          limit: 20
        })
        .then(function(data) {
          songIDs = [];
          data.body.items.forEach(function(p) {
            var obj = {
              id: p.track.id,
              played_at: p.played_at,
              name: p.track.name
            };
            arr.push(obj.name);
            songIDs.push(p.track.id);

            spotifyApi.getAudioFeaturesForTracks(songIDs).then(data => {
              let info = data.body.audio_features;
              //console.log("FUUUUUUUCCCCCCCKKKKKKKK " + data.body.audio_features.length);
              arrayPass.push(info, arr);
              if (data.body.audio_features.length >= 20) {
                res.json(arrayPass);
              }
            });
          });
        });
    })
    .catch(err => {
      console.log("DEBUG err", err);
    });
});

//-------------------------------------------------
//Display all songs on home page
//-------------------------------------------------

router.get("/getsongs", (req, res, next) => {
  Song.find()
    .then(data => {
      let songs = data;
      res.json({ songs });
    })
    .catch(err => next(err));
});

//-------------------------------------------------
//Create new playlist
//-------------------------------------------------

router.post(
  "/addSongsToPlaylist",
  initSpotifyWithLoggedInUser,
  (req, res, next) => {
    const { songUris, playlistName } = req.body;
    console.log("songUris", songUris);

    res.spotifyApi
      .createPlaylist(req.user.spotifyId, playlistName)
      .then(data => {
        let playlistId = data.body.id;
        return res.spotifyApi.addTracksToPlaylist(playlistId, songUris);
      })
      .then(() => {
        res.json({
          success: true
        });
      });
  }
);

//-------------------------------------------------
//Filter through songs -- NOT IN USE!!
//-------------------------------------------------

router.post(
  "/playlistsFilter",
  initSpotifyWithLoggedInUser,
  (req, res, next) => {
    let danceabilityWeight = 1;
    let { danceability, tempo } = req.body;
    Song.find()
      .lean()
      .then(songs => {
        let songUris = songs
          .map(song => {
            let score =
              danceabilityWeight * Math.abs(song.danceability - danceability) +
              Math.abs(song.tempo - tempo);
            return {
              ...song,
              score: score
            };
          })
          .sort((a, b) => a.score - b.score)
          .slice(0, 10)
          .map(song => song.uri);

        return res.spotifyApi
          .createPlaylist(req.user.spotifyId, "test anjali new" + danceability)
          .then(data => {
            let playlistId = data.body.id;
            return res.spotifyApi.addTracksToPlaylist(playlistId, songUris);
          })
          .then(data => {
            res.json(data);
          });
      })
      .catch(err => next(err));
  }
);

module.exports = router;
