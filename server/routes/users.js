const express         = require('express');
const router          = express.Router();
const UsersController = require('../controllers/users-controller')

// Find one user
router.get('/:id', UsersController.findOneUser)

// Create new User / Signup
router.post('/', UsersController.createUser);

// Delete User
router.delete('/:id', UsersController.deleteUser);

// Add new task to the User
router.put('/:id/addcat', UsersController.addCategory);

// Remove task from the User
router.put('/:id/removecat', UsersController.removeCategory);

// Rename User
router.put('/:id/rename', UsersController.renameUser);

// Regular Login, returns access token
router.post('/login', UsersController.login);

// Facebook Login, returns access token
router.post('/fblogin', )

module.exports = router;
