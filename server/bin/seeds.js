require("dotenv").config();

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Song = require("../models/Song");
const songs = require("./songs.json");
const dbName = "moodify-project";

const bcryptSalt = 10;

require("../configs/database");

Song.deleteMany()
  .then(() => {
    return Song.create(songs);
  })
  .then(songCreated => {
    console.log(`${songCreated.length} song created with the following id:`);
    console.log(songCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
