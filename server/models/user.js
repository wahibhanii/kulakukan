'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId      : String,
  password    : String,
  userName    : String,
  categories  : [{type: Schema.Types.ObjectId, ref: 'Category'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;