const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  spotifyId: String,
  accessToken: String,
  refreshToken: String,
  expiresIn: String,
  displayName: String,
  pictureUrl: String,
  spotifyProfileUrl: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
