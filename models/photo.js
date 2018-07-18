const mongoose = require('mongoose');
const User = require('./user')

const photoSchema = mongoose.Schema({
  username: [User.schema],
  dateAdded: Date,
  url: {type: String, required: true},
  aboutPhoto: String
});



const Photo = mongoose.model('Photo', photoSchema);

module.exports = mongoose.model('Photo', photoSchema);

