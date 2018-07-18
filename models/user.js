const mongoose = require('mongoose');
const Photo = require('./photo')

const userSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  // photo: [Photo.schema]

});



// const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);


