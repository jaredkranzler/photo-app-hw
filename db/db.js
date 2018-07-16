const mongoose = require('mongoose');

// create our db and connect
mongoose.connect('mongodb://localhost/photo-app-hw');

mongoose.connection.on('connected', () => {
  console.log('mongoos is connected')
})

mongoose.connection.on('connected', (err) => {
  console.log(err, 'mongoose error')
})

mongoose.connection.on('disconnected', () => {
  console.log('mongoos is disconnected')
})

