const ObjectId    = require('mongodb').ObjectId;
const Task        = require('../models/task');

class TasksController {

  static showAllTasks(req, res){
    Task.find()
    .then(result => {
      res.status(200).json({
        message : 'Find all task success!',
        data    : result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static createTask(req, res){
    let newTask = {
      description : req.body.description,
      isComplete  : false,
      createdAt   : new Date(),
      completedAt : null,
      alarm       : Date(req.body.alarm),
      tags        : req.body.tags
    }
    Task.create(newTask)
    .then(result => {
      res.status(200).json({
        message : 'Create new task success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static findOneTask(req, res){
    Task.findOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Find task entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static deleteTask(req, res){
    Task.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Delete task entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static editDescription(req, res){
    let taskId = req.params.id
    Task.findOne({_id: taskId})
    .then(result => {
      let newTask = {
        description : req.body.description || result.description,
        isComplete  : result.isComplete,
        createdAt   : result.createdAt,
        completedAt : result.completedAt,
        alarm       : result.alarm,
        tags        : result.tags,
      }
      return Task.update({_id: taskId}, newTask)
    })
    .then(result => {
      res.status(200).json({
        message : 'Edit task description success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static complete(req, res){
    let taskId = req.params.id
    Task.findOne({_id: taskId})
    .then(result => {
      let newTask = {
        description : result.description,
        isComplete  : true,
        createdAt   : result.createdAt,
        completedAt : new Date(),
        alarm       : result.alarm,
        tags        : result.tags,
      }
      return Task.update({_id: taskId}, newTask)
    })
    .then(result => {
      res.status(200).json({
        message : 'Mark task as complete success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static uncomplete(req, res){
    let taskId = req.params.id
    Task.findOne({_id: taskId})
    .then(result => {
      let newTask = {
        description : result.description,
        isComplete  : false,
        createdAt   : result.createdAt,
        completedAt : null,
        alarm       : result.alarm,
        tags        : result.tags,
      }
      return Task.update({_id: taskId}, newTask)
    })
    .then(result => {
      res.status(200).json({
        message : 'Mark task as uncomplete  success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static editTags(req, res){
    let taskId = req.params.id
    Task.findOne({_id: taskId})
    .then(result => {
      let newTask = {
        description : result.description,
        isComplete  : result.isComplete,
        createdAt   : result.createdAt,
        completedAt : result.completedAt,
        alarm       : result.alarm,
        tags        : req.body.tags,
      }
      return Task.update({_id: taskId}, newTask)
    })
    .then(result => {
      res.status(200).json({
        message : 'Edit task\'s tag success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

}

module.exports = TasksController