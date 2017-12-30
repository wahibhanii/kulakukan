const ObjectId    = require('mongodb').ObjectId;
const Category        = require('../models/category');
const User      = require('../models/user')

class CategoriesController {

  static findOneCategory(req, res){
    Category.findOne({_id: req.params.id}).populate('lists')
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
      lists    : [],
      owners   : [req.headers.decoded._id]
    }
    let newCatId = null
    Category.create(newCategory)
    .then(result => {
      // console.log('create cat result -------->',result._id)
      newCatId = result._id
      // console.log(newCatId,'-------------------------====')
      return User.findOne({_id: req.headers.decoded._id})
    })
    .then(userResult => {
      // console.log(userResult, newCatId, 'userresult+++++++++++')
      userResult.categories.push(newCatId)
      let newUser = {
        email      : userResult.email,
        userName    : userResult.userName,
        password    : userResult.password,
        categories  : userResult.categories
      }
      return User.update({_id: req.headers.decoded._id}, newUser)
    })
    .then(result => {
      res.status(200).json({
        message : 'Adding Category to user success!',
        data    : result
      })
    })
      // -------------------
      // res.status(200).json({
      //   message : 'Create new category success!',
      //   data    : result,
      // })
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
    .then(categoryResult => {
      console.log(categoryResult, req.body)
      categoryResult.lists.push(req.body.listId)
      let newCategory = {
        catName : categoryResult.catName,
        lists   : categoryResult.lists,
        owners  : categoryResult.owners
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
    .then(categoryResult => {
      categoryResult.lists.splice(categoryResult.lists.indexOf(req.body.listId),1)
      let newCategory = {
        catName : categoryResult.catName,
        lists    : categoryResult.lists,
        owners  : categoryResult.owners
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
    .then(categoryResult => {
      let newCategory = {
        catName : req.body.catName || categoryResult.catName,
        lists    : categoryResult.lists,
        owners  : categoryResult.owners
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