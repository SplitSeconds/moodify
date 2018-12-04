const passport = require("passport");
const User = require("../models/User");
const SpotifyStrategy = require("passport-spotify").Strategy;
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: "http://localhost:5000/api/spotify-login/callback"
      //URL: "http://localhost:5000/api/spotifycallback-login/callback"
    },
    function(accessToken, refreshToken, expiresIn, profile, done) {
      User.findOne({ spotifyId: profile.id })
        .then(user => {
          console.log("DEBUG profile", profile);
          // If no user, 1st time the user connect
          if (!user) {
            return User.create({
              spotifyId: profile.id,
              accessToken,
              refreshToken,
              expiresIn,
              displayName: profile.displayName,
              pictureUrl: profile.photos[0],
              spotifyProfileUrl: profile.profileUrl
            });
          } else {
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            return user.save();
          }
          // TODO: update the user with the accessToken?
          // return user;
        })
        .then(user => done(null, user))
        .catch(err => done(err));
    }
  )
);
