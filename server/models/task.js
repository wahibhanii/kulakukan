'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description : String,
  isComplete  : String,
  createdAt   : Date,
  completedAt : Date,
  alarm       : Date,
  tags        : [String],
  owners      : [{type: Schema.Types.ObjectId, ref: 'User'}] 
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;