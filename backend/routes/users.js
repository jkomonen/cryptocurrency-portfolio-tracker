const router = require('express').Router(); //need this cuz this is the route were creating
let User = require('../models/user.model'); //this is the mongoose model we created

//if the url is localhost:5000/users/ and its a GET request, this function will run
router.route('/').get((req, res) => {
  User.find() //find is a mongoose method to get a list of all users from the mongodb atlas database
    .then(users => res.json(users)) //after it finds, then get all the users. res.json means were gonna return 'users' (that we got from the database) in json format
    .catch(err => res.status(400).json('Error: ' + err)); //if theres an error, return error status message
});

//handles http POST requests if the url is localhost:5000/users/add
router.route('/add').post((req, res) => {
  const username = req.body.username; //gonna expect to receive a username

  const newUser = new User({username}); //create a new instance of 'User' using the username

  newUser.save() //the new user is saved to the database with the save() method
    .then(() => res.json('User added!')) //after the user is added to the db, return 'User added!' in json
    .catch(err => res.status(400).json('Error: ' + err)); //if it doesnt work, return error message
});

module.exports = router; //standard for router files

