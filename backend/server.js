//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~WHY I NEED TO INSTALL EACH THING~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//npm i express cors mongoose dotenv (install these in backend folder)
//npm i -g nodemon (in backend folder)
//npm init -y (in backend folder)
//npm i bootstrap in main folder
//npm i react-router-dom in main folder
//npm i react-datepicker in main folder
//npm i axios in main folder (IDK just do both) (frontend installation pretty sure)
//what these installations do (below)
//cors: cross origin resource sharing. Makes it so we can easily access something outside of our server from our server
//mongoose: makes interacting with mongoDB through node.js simpler
//dotenv: loads environment variables from a .env file into process.env making development simpler. instead of setting up environment variable on our development machine, they can be stored in a file called .env
//nodemon: makes development easier. helps develop node.js applications by auto restarting the node app when files are changed
//init -y: creates package.json file and answers yes to all questions
//bootstrap: makes it easier for css styling
//react-router-dom: make it easier to route different urls to different react components
//react-datepicker: access to a calendar to pick dates

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helps to connect to mongodb

require('dotenv').config();


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~CONNECT TO EXPRESS SERVER~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const app = express();
const port = process.env.PORT || 5000; //open the port i put in the .env file and if it doesnt work, use port 5000 



//~~~~~~~~~~~~~~~~~//
//~~~MIDDLEWARE~~~//
//~~~~~~~~~~~~~~~//
//allows us to parse json cuz our server is going to be sending and receiving json
app.use(cors());
app.use(express.json());



//~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~CONNECT TO MONGODB~~~//
//~~~~~~~~~~~~~~~~~~~~~~~//
const uri = process.env.ATLAS_URI; //this is our database uri which we have to get from mongodb atlas dashboard
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true } //pass in 'uri' cuz thats where our database is stored and thats how we start our connection
);
const connection = mongoose.connection;
connection.once('open', () => { //once the connection is open, log that mongodb connection is successful
  console.log("MongoDB database connection established successfully");
})



//~~~~~~~~~~~~~~~~~~~~~~//
//~~~USE THE ROUTERS~~~//
//~~~~~~~~~~~~~~~~~~~~//
//require the files
const cryptosRouter = require('./routes/cryptos');
const usersRouter = require('./routes/users');

//tell the server to use the files we just created (routes folder)
//now use the files after requiring them
app.use('/cryptos', cryptosRouter); //now, when someone goes to our root url and puts /cryptos at the end, its going to load everything in the 'cryptos' router
app.use('/users', usersRouter); //now, when someone goes to our root url and puts /users at the end, its going to load everything in the 'users' router



//~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~STARTS THE SERVER~~~//
//~~~~~~~~~~~~~~~~~~~~~~//
//starts listening on a certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
