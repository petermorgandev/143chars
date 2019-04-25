var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

/* authenticate input against database documents */

/* hash the password */

var User = mongoose.model('User', UserSchema);
module.exports = User;