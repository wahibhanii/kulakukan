const ObjectId    = require('mongodb').ObjectId;
const Category        = require('../models/category');

class CategoriesController {

  static findOneCategory(req, res){
    Category.findOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Find category entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static createCategory(req, res){
    let newCategory = {
      catName  : req.body.catName,
      lists     : []
    }
    Category.create(newCategory)
    .then(result => {
      res.status(200).json({
        message : 'Create new category success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static deleteCategory(req, res){
    Category.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Delete category entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })

  }

  static addList(req, res){
    Category.findOne({_id: req.params.id})
    .then(CategoryResult => {
      console.log(CategoryResult, req.body)
      let newList = {
        orderNo : CategoryResult.lists.length+1,
        listId  : req.body.listId
      }
      CategoryResult.lists.push(newList)
      let newCategory = {
        catName : CategoryResult.catName,
        lists    : CategoryResult.lists
      }
      return Category.update({_id: req.params.id}, newCategory)
    })
    .then(result => {
      res.status(200).json({
        message : 'Adding list to category success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static removeList(req, res){
    Category.findOne({_id: req.params.id})
    .then(CategoryResult => {
      CategoryResult.lists.splice(CategoryResult.lists.findIndex(lists => lists['listId'] === req.body.listId),1)
      let newCategory = {
        catName : CategoryResult.catName,
        lists    : CategoryResult.lists
      }
      return Category.update({_id: req.params.id}, newCategory)
    })
    .then(result => {
      res.status(200).json({
        message : 'Removing list from category success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static renameCategory(req, res){
    Category.findOne({_id: req.params.id})
    .then(CategoryResult => {
      let newCategory = {
        catName : req.body.catName || CategoryResult.catName,
        lists    : CategoryResult.lists
      }
      return Category.update({_id: req.params.id}, newCategory)
    })
    .then(result => {
      res.status(200).json({
        message : 'Rename  category success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

}

module.exports = CategoriesController