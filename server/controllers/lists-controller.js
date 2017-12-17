const ObjectId    = require('mongodb').ObjectId;
const List        = require('../models/list');

class ListsController {

  static findOneList(req, res){
    List.findOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Find list entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static createList(req, res){
    let newList = {
      listName  : req.body.listName,
      tasks     : []
    }
    List.create(newList)
    .then(result => {
      res.status(200).json({
        message : 'Create new list success!',
        data    : result,
        owners  : [req.headers.decoded._id]
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static deleteList(req, res){
    List.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Delete list entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })

  }

  static addTask(req, res){
    List.findOne({_id: req.params.id})
    .then(listResult => {
      console.log(listResult, req.body)
      listResult.tasks.push(req.body.taskId)
      let newList = {
        listName : listResult.listName,
        tasks    : listResult.tasks,
        owners   : CategoryResult.owners
      }
      return List.update({_id: req.params.id}, newList)
    })
    .then(result => {
      res.status(200).json({
        message : 'Adding task to list success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static removeTask(req, res){
    List.findOne({_id: req.params.id})
    .then(listResult => {
      listResult.tasks.splice(listResult.tasks.indexOf(req.body.taskId),1)
      let newList = {
        listName : listResult.listName,
        tasks    : listResult.tasks,
        owners  : CategoryResult.owners
      }
      return List.update({_id: req.params.id}, newList)
    })
    .then(result => {
      res.status(200).json({
        message : 'Removing task from list success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static renameList(req, res){
    List.findOne({_id: req.params.id})
    .then(listResult => {
      let newList = {
        listName : req.body.listName || listResult.listName,
        tasks    : listResult.tasks,
        owners  : CategoryResult.owners
      }
      return List.update({_id: req.params.id}, newList)
    })
    .then(result => {
      res.status(200).json({
        message : 'Rename  list success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

}

module.exports = ListsController