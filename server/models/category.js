'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  catName   : String,
  lists     : [{type: Schema.Types.ObjectId, ref: 'List'}]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;