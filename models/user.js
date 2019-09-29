const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

UserSchema.statics.authenticate = async (username, password, callback) => {
  try {
    const user = await User.findOne({ username: username }).exec();
    const result = await bcrypt.compare(password, user.password)
    if (!result) return callback(); 
    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
};

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(error => next(error));
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
