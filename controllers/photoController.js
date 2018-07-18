const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo')
const User = require('../models/user')




// INDEX
router.get('/', (req, res) => {
  Photo.find({}, (err, foundPhotos) => {
    
    res.render('photos/index.ejs', {photos: foundPhotos});
  });
});






// NEW
router.get('/new', (req, res) => {
  User.find({}, (err, allUsers) => {
     res.render('photos/new.ejs', { users: allUsers})
   })
});



//display the user with a link to the photos show page

// SHOW
router.get('/:id', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    // we need to find th user of the photo
    User.findOne({'photos._id': req.params.id}, 
    (err, foundUser) => {
      res.render('photos/show.ejs', {
       user: foundUser,
       photo: foundPhoto
     });
    })
  });
});




// EDIT
router.get('/:id/edit', (req, res) => {
  
  Photo.findById(req.params.id, (err, foundPhoto) => {
    //Find all the users, so we can select them in the drop down menu
    //when we are editing
    User.find({}, (err, allUsers) => {

      //then we need to find the user that the photo is buy
      User.findOne({'photos._id': req.params.id}, (err, foundPhotoUser) => {
        
        res.render('photos/edit.ejs', {
          photo: foundPhoto,
          users: allUsers,
          photoUser: foundPhotoUser
        }); 
      });
    });
  });
});






// UPDATE
router.put('/:id', (req, res) => {
  Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
    //find the user with that photo
    User.findOne({ 'photos._id': req.params.id}, (err, foundUser) => {
      if (foundUser._id.toString() !== req.body.userId){
        //moving that photo from the old user an then savin git
        foundUser.photos.id(req.params.id).remove();
        foundUser.save((err, savedFoundUser) => {
          //Find the new user (sent to us by the form) and the photo to their array and sving the new user
          User.findById(req.body.userId, (err, newUser) => {
            newUser.photos.push(updatedPhoto);
            newUser.save((err, savedNewUser) => {
              res.redirect('/photos/')
            });
          });
        });

      }else{
        //if the user is the same as before
        //first finding the photo and removing, req.params.id = photos id
        foundUser.photos.id(req.params.id).remove();
        //pushing updated Photo into the photos array
        foundUser.photos.push(updatedPhoto);
        // saving that Photo
        foundUser.save((err, data) => {
          // updating that photo
          res.redirect('/photos/');
        });
      }
    });
  });  
});



// POST
router.post('/', (req, res) => {

  User.findById(req.body.userId, (err, foundUser) => {

    // found user is the document, with photos array

    Photo.create(req.body, (err, createdPhoto) => {
      //updated photo schema and user schema
      foundUser.photos.push(createdPhoto);
      //saving it
      foundUser.save((err, data) => {
        //passing it back to the client
        res.redirect('/photos')
      })
    })
  });
});



// DELETE
router.delete('/:id', (req, res) => {
  
  Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
    //this is finding the user with that photo attached to it
    User.findOne({'photos._id':req.params.id}, (err, foundUser) => {
     //finding the Photo in the users array and removing it
      foundUser.photos.id(req.params.id).remove();
      //respond back to the client
      foundUser.save((err, data) => {
        res.redirect('/photos')
      });
    });
  });
});



module.exports = router;






