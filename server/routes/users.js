const express         = require('express');
const router          = express.Router();
const UsersController = require('../controllers/users-controller')
const authentication  = require('../controllers/authentication') 
const UserAuth = require('../controllers/user-auth')

// Find one user
router.get('/:id', authentication, UserAuth.userAuth, UsersController.findOneUser)

// Create new User / Signup
router.post('/', authentication, UsersController.createUser);

// Delete User
router.delete('/:id', authentication, UserAuth.userAuth, UsersController.deleteUser);

// Add new task to the User
router.put('/:id/addcat', authentication, UserAuth.userAuth, UsersController.addCategory);

// Remove task from the User
router.put('/:id/removecat', authentication, UserAuth.userAuth, UsersController.removeCategory);

// Rename User
router.put('/:id/rename', authentication, UserAuth.userAuth, UsersController.renameUser);

// Regular Login, returns access token
router.post('/login', UsersController.login);

// Facebook Login, returns access token
// router.post('/fblogin', ) // upcoming feature

module.exports = router;
