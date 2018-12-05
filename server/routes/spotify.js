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

router.get("/getsongs", (req, res, next) => {
  // let songs = data.body.tracks.items;
  Song.find()
    .then(data => {
      let songs = data;
      console.log(data);
      res.json({ songs });
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
        .createPlaylist(req.user.spotifyId, "test anjali " + danceability)
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

//send names to the front end
//send audio features to the front end
//user manipulates audio features, and maybe create an if statement that says if it matches the ID of the playlist, it shows that track name
//then send the tracks to spotify API
router.get(
  "/playlists/toptracks",
  initSpotifyWithLoggedInUser,
  (req, res, next) => {
    res.spotifyApi
      .getPlaylist("091l3sqkJPvGitfuJsLZLh")
      .then(
        data => {
          let songs = data.body.tracks.items;
          res.json(songs);
          console.log(data.body.tracks.items[0].track.name);
          console.log(songs);
          // return res.spotifyApi
          //   .getAudioFeaturesForTrack("3Qm86XLflmIXVm1wcwkgDK")
          //   .then(
          //     data => {
          //       console.log(data.body);
          //     },
          //     function(err) {
          //       done(err);
          //     }
          //   );
        },
        function(err) {
          console.log("Something went wrong!", err);
        }
      )
      .catch(err => next(err));
  }
);

router.post("/playlists", initSpotifyWithLoggedInUser, (req, res, next) => {
  res.spotifyApi
    .createPlaylist(req.user.spotifyId, "Lindsezäs plazlist")
    .then(data => {
      let playlistId = data.body.id;
      return res.spotifyApi.addTracksToPlaylist(playlistId, [
        "spotify:track:2rPE9A1vEgShuZxxzR2tZH",
        "spotify:track:3QjIdDDKoZRyfWDKZC4Ayb"
      ]);
    });
});

//-------------------------------------------------
//Nele is testing Users recently play tracks start
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
              //console.log("RECENT TRACKS AUDIO FEATURES", data.body, "NAME", arr);
              let info = data.body.audio_features;
  
              console.log("FUUUUUUUCCCCCCCKKKKKKKK " + data.body.audio_features.length);
              // console.log("HEREEEEE ISSSS First " + arrayPass[0]);
              // console.log("HEREEEEE ISSSS Second " + arrayPass[1]);
              //console.log("THIIIIIIIIIIS" + arrayPass.length);

              arrayPass.push(info, arr);
              console.log("MEEEEEEEEEEEH" + arrayPass.length)

              if (data.body.audio_features.length >= 20) {
              
                res.json(arrayPass);
                //res.json(info);
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
//Nele is testing Users recently play tracks end
//-------------------------------------------------

module.exports = router;
