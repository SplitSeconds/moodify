const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Song = require("../models/Song");
require("../configs/database");

router.get("/secret", isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

router.get("/", (req, res, next) => {
  // let { danceability } = req.body;
  Song.find()
    .then(songs => {
      res.json({
        songs: songs
      });
    })
    .catch(err => next(err));
});

module.exports = router;
