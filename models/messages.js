var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;