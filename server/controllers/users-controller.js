const ObjectId    = require('mongodb').ObjectId;
const User        = require('../models/user');
const bcrypt      = require('bcryptjs');
const salt        = bcrypt.genSaltSync(10);
const jwt         = require('jsonwebtoken');

class UsersController {

  static findOneUser(req, res){
    User.findOne({_id: req.params.id})
    .populate({
      path: 'categories',
      model: 'Category',
      populate: {
        path: 'lists',
        model: 'List',
        populate: {
          path: 'tasks',
          model: 'Task',
        }
      }
    })
    .then(result => {
      res.status(200).json({
        message : 'Find User entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static createUser(req, res){
    let newUser = {
      userId      : req.body.userId,
      userName    : req.body.userName,
      password    : bcrypt.hashSync(req.body.password, salt),
      categories  : []
    }
    User.create(newUser)
    .then(result => {
      res.status(200).json({
        message : 'Create new User success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static deleteUser(req, res){
    User.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Delete User entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })

  }

  static addCategory(req, res){
    User.findOne({_id: req.params.id})
    .then(userResult => {
      console.log(userResult, req.body)
      let newCat = req.body.catId
      userResult.categories.push(newCat)
      let newUser = {
        userId      : userResult.userId,
        userName    : userResult.userName,
        password    : userResult.password,
        categories  : userResult.categories
      }
      return User.update({_id: req.params.id}, newUser)
    })
    .then(result => {
      res.status(200).json({
        message : 'Adding task to user success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static removeCategory(req, res){
    User.findOne({_id: req.params.id})
    .then(userResult => {
      userResult.categories.splice(userResult.categories.indexOf(req.body.catId),1)
      let newUser = {
        userId      : userResult.userId,
        userName    : userResult.userName,
        password    : userResult.password,
        categories  : userResult.categories
      }
      return User.update({_id: req.params.id}, newUser)
    })
    .then(result => {
      res.status(200).json({
        message : 'Removing task from user success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static renameUser(req, res){
    User.findOne({_id: req.params.id})
    .then(userResult => {
      let newUser = {
        userId      : userResult.userId,
        userName    : req.body.userName  || userResult.userName,
        password    : userResult.password,
        categories  : userResult.categories
      }
      return User.update({_id: req.params.id}, newUser)
    })
    .then(result => {
      res.status(200).json({
        message : 'Rename  user success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static login(req, res){

    User.findOne({userId: req.body.userId})
    .then(userResult => {
      if (bcrypt.compareSync(req.body.password, userResult.password)){
        console.log('Login Success!')
        let payload = {
          _id  : userResult._id,
          userId    : userResult.userId,
          userName  : userResult.userName
        }
        let token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
        res.status(200).json({
          message : 'Login Success!',
          data    : token
        })

      } else {
        console.log('Wrong Password, login fail')
        res.status(403).json({
          message: 'Wrong Password, login fail'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

}

module.exports = UsersController