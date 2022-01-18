//need to put and read things from the database so i create a database schema using mongoose
//this is gonna look the same for any mongoose schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { //schema has a single field (username)
    type: String, //username will be type: String
    required: true, //username is required
    unique: true, //username is unique
    trim: true, //if user types in whitespaces on the ends, it'll be trimmed off
    minlength: 3 //min length of 3 characters long
  },
}, {
  timestamps: true, //auto create timestamps of when it was created or modified
});

const User = mongoose.model('User', userSchema); //'User' can be anything but its the name we chose

module.exports = User;