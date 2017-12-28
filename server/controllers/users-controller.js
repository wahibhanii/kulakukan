const ObjectId    = require('mongodb').ObjectId;
const User        = require('../models/user');
const bcrypt      = require('bcryptjs');
const salt        = bcrypt.genSaltSync(10);
const jwt         = require('jsonwebtoken');
var FB            = require('fb')

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
      email      : req.body.email,
      userName    : req.body.userName,
      password    : bcrypt.hashSync(req.body.password, salt),
      profPicUrl  : null,
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
        email      : userResult.email,
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
        email      : userResult.email,
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
        email      : userResult.email,
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
    console.log(req.body, '---------ini req')
    User.findOne({email: req.body.email})
    .then(userResult => {
      if (bcrypt.compareSync(req.body.password, userResult.password)){
        console.log('Login Success!')
        let payload = {
          _id  : userResult._id,
          email    : userResult.email,
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

  static fblogin(req, res){
    console.log(req.body, ' ini req body------------ fb login...')
    FB.api(
      `/${req.body.authResponse.userID}`,
      'GET',
      {fields: ['email','first_name', 'last_name', 'picture'],
      access_token: req.body.authResponse.accessToken },
      (response) => {
          console.log(response,'ini response dari fb')
          User.findOne({email: response.email})
          .then(dataUser => {
            if (dataUser == null){
              let newUser = {
                email: response.email,
                profPicUrl: response.picture.data.url,
                userName: `${response.first_name} ${response.last_name}`,
                categories  : []
              }
              User.create(newUser)
              .then(result => {
                console.log(result)
                let payload = {
                  _id       : result._id,
                  userName  : result.userName,
                  email     : result.email,
                  profPicUrl: result.profPicUrl,
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
                console.log('ini token create', token)
                res.status(200).json({
                  message : 'Login Successful',
                  data    : result,
                  token   : token
                })
              })
            } else{
              let payload = {
                _id       : dataUser._id,
                userName  : dataUser.userName,
                email     : dataUser.email,
                profPicUrl: dataUser.profPicUrl,
              }
              console.log('ini payload',payload)
              let token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
              console.log('ini token', token)
              res.status(200).json({
                message : 'Login Successful',
                data    : dataUser,
                token   : token,
              })
            }
          })
          .catch(err => {
            console.log(err)
            res.status(500).send(err)
          })
      }
    );
  }

}

module.exports = UsersController