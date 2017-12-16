const express         = require('express');
const router          = express.Router();
const UsersController = require('../controllers/users-controller')
const authentication  = require('../controllers/authentication') 

// Find one user
router.get('/:id', authentication, UsersController.findOneUser)

// Create new User / Signup
router.post('/', UsersController.createUser);

// Delete User
router.delete('/:id', authentication, UsersController.deleteUser);

// Add new task to the User
router.put('/:id/addcat', authentication, UsersController.addCategory);

// Remove task from the User
router.put('/:id/removecat', authentication, UsersController.removeCategory);

// Rename User
router.put('/:id/rename', authentication, UsersController.renameUser);

// Regular Login, returns access token
router.post('/login', UsersController.login);

// Facebook Login, returns access token
router.post('/fblogin', )

module.exports = router;
