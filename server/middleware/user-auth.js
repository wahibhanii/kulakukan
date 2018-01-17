// Deny acces if item is not owned by User
const User      = require('../models/user');
const Category  = require('../models/category');
const List      = require('../models/list');
const Task      = require('../models/task');

class UserAuth {

  static userAuth(req, res, next){
    if (req.params.id === req.headers.decoded._id){
      next()
    } else {
      res.status(403).json({
        message: 'You don\'t have access!'
      })
    }
  }

  static catAuth(req, res, next){
    Category.findOne({_id : req.params.id})
    .then(result => {
      if (result.owners.length === 0 || result.owners.indexOf(req.headers.decoded._id) !== -1 ) {
        next()
      } else {
        res.status(403).json({
          message : 'Acces Denied!'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static listAuth(req, res, next){
    List.findOne({_id : req.params.id})
    .then(result => {
      if (result.owners.length === 0 || result.owners.indexOf(req.headers.decoded._id) !== -1 ) {
        next()
      } else {
        res.status(403).json({
          message : 'Acces Denied!'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static taskAuth(req, res, next){
    Task.findOne({_id : req.params.id})
    .then(result => {
      if (result.owners.length === 0 || result.owners.indexOf(req.headers.decoded._id) !== -1 ) {
        next()
      } else {
        res.status(403).json({
          message : 'Acces Denied!'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }


}

module.exports = UserAuth