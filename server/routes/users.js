const express         = require('express');
const router          = express.Router();
const UsersController = require('../controllers/users-controller')
const authentication  = require('../middleware/authentication') 
const UserAuth = require('../middleware/user-auth')

// Find one user
router.get('/:id', authentication, UserAuth.userAuth, UsersController.findOneUser)

// Create new User / Signup
router.post('/', UsersController.createUser);

// Delete User
router.delete('/:id', authentication, UserAuth.userAuth, UsersController.deleteUser);

// Add new Category to the User
router.put('/:id/addcat', authentication, UserAuth.userAuth, UsersController.addCategory);

// Remove Category from the User
router.put('/:id/removecat', authentication, UserAuth.userAuth, UsersController.removeCategory);

// Rename User
router.put('/:id/rename', authentication, UserAuth.userAuth, UsersController.renameUser);

// Regular Login, returns access token
router.post('/login', UsersController.login);

// Facebook Login, returns access token
router.post('/fblogin', UsersController.fblogin ) // upcoming feature

module.exports = router;
