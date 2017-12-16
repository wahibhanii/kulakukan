'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  listName  : String,
  tasks     : [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

const List = mongoose.model('List', listSchema);

module.exports = List;