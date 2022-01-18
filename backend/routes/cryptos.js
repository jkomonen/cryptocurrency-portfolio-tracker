const router = require('express').Router(); //need this cuz this is the route were creating
let Crypto = require('../models/crypto.model'); //this is the mongoose model we created

//if the url is localhost:5000/cryptos/ and its a GET request, this function will run
router.route('/').get((req, res) => {
  Crypto.find() //find is a mongoose method to get a list of all cryptos from the mongodb atlas database
    .then(cryptos => res.json(cryptos)) //after it finds, then get all the cryptos. res.json means were gonna return 'cryptos' (that we got from the database) in json format
    .catch(err => res.status(400).json('Error: ' + err)); //if theres an error, return error status message
});

//handles http POST requests if the url is localhost:5000/cryptos/add
router.route('/add').post((req, res) => {
  const username = req.body.username; //requesting and needs username, amount, price, and date in json from user then it makes an instance and saves it in mongodb
  const amount = req.body.amount;
  const price = Number(req.body.price); //converting to number type
  const date = Date.parse(req.body.date); //converting to a date type

  const newCrypto = new Crypto({ //create a new instance of 'crypto' using the newcrypto
    username,
    amount,
    price,
    date,
  });

  newCrypto.save() //the new crypto is saved to the database with the save() method
  .then(() => res.json('Cryptocurrency added!')) //after the crypto is added to the db, return 'crypto added!' in json
  .catch(err => res.status(400).json('Error: ' + err)); //if it doesnt work, return error message
});

//:id is like a variable created automatically by mongodb. were going to return just the info about that crypto
router.route('/:id').get((req, res) => {
  Crypto.findById(req.params.id) //get the crypto corresponded to the id
    .then(cryptos => res.json(cryptos)) //return the crypto as json
    .catch(err => res.status(400).json('Error: ' + err)); //else return an error
});

router.route('/:id').delete((req, res) => {
  Crypto.findByIdAndDelete(req.params.id) //delete crypto from database
    .then(() => res.json('Cryptocurrency deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { //this works as put and i think it should be put
  Crypto.findById(req.params.id) //get the crypto corresponded to the id
    .then(cryptos => {
      cryptos.username = req.body.username; //change old info with new
      cryptos.amount = req.body.amount;
      cryptos.price = Number(req.body.price);
      cryptos.date = Date.parse(req.body.date);

      cryptos.save() //save to database
        .then(() => res.json('Cryptocurrency updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; //standard for router files
