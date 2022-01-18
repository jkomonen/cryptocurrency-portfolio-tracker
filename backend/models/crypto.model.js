//need to put and read things from the database so i create a database schema using mongoose
//this is gonna look the same for any mongoose schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cryptoSchema = new Schema({ //4 fields with validations on the same line
  username: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;


