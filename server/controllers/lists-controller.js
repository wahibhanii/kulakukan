const ObjectId    = require('mongodb').ObjectId;
const List        = require('../models/list');
const Category    = require('../models/category')

class ListsController {

  static findOneList(req, res){
    List.findOne({_id: req.params.id}).populate('tasks')
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
    console.log('create list')
    let newList = {
      listName  : req.body.listName,
      tasks     : [],
      owners    : [req.headers.decoded._id],
      categories: [req.body.catId]
    }
    let newListId
    List.create(newList)
    .then(result => {
      console.log(result)
      newListId = result._id
      return Category.findOne({_id: req.body.catId})
    })
    .then(categoryResult => {
      categoryResult.lists.push(newListId)
      let newCategory = {
        catName : categoryResult.catName,
        lists   : categoryResult.lists,
        owners  : categoryResult.owners,
        categories: categoryResult.categories
      }
      return Category.update({_id: req.body.catId}, newCategory)
    })
    .then(result => {
      res.status(200).json({
        message : 'Create new list success!',
        data    : result
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
        owners   : listResult.owners,
        categories: listResult.categories
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
        owners   : listResult.owners,
        categories: listResult.categories
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
        owners   : listResult.owners,
        categories: listResult.categories
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