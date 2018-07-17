const express = require('express');
const router = express.Router();
const User = require('../models/user')

// INDEX
router.get('/', (req, res) => {
  User.find({}, (err, foundUsers) => {
    
    res.render('users/index.ejs', {
      users: foundUsers
    });
  });
});

// NEW
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

//SHOW
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render('users/show.ejs', {
      user: foundUser
    });
  });
});

// Edit
router.get('/:id/edit', (req, res) => {
  
  User.findById(req.params.id, (err, foundUser) => {
    res.render('users/edit.ejs', {
      user: foundUser
    });
  });
});

// Update
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updateUser) => {
      console.log(updateUser, ' this is findByIdAndUpdate')
      res.redirect('/users')
    })
})


// POST
router.post('/', (req, res) => {
  console.log(req.body)
  User.create(req.body, (err, createdUser) => {
    console.log(createdUser, ' this is the created user');
    res.redirect('/users')
  });
});

// DELETE
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deleteUser) => {
      console.log(deleteUser, ' this is deleted User')
      res.redirect('/users')
    })
});


module.exports = router;





