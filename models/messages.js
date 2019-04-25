var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;