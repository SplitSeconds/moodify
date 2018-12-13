const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Song = require("../models/Song");
require("../configs/database");

// router.get("/", (req, res, next) => {
//   let { danceability } = req.body;
//   console.log("calling get songs");
//   Song.find()
//     .then(songs => {
//       let value = songs.filter(song => {
//         return song.danceability >= danceability;
//       });
//       console.log(value);
//       res.json({
//         value
//       });
//     })
//     .catch(err => next(err));
// });

module.exports = router;
