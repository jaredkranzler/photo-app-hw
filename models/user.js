const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: {type: String, required: true},
  dateAdded: Date,
  photo: String
});





module.exports = mongoose.model('User', userSchema);


