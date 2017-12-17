const express = require('express');
const router = express.Router();
const ListsController = require('../controllers/lists-controller');
const authentication  = require('../controllers/authentication') 
const UserAuth = require('../controllers/user-auth')

// Find one list
router.get('/:id', authentication, UserAuth.listAuth, ListsController.findOneList)

// Create new list
router.post('/', authentication, ListsController.createList);

// Delete list
router.delete('/:id',  authentication, UserAuth.listAuth, ListsController.deleteList);

// Add new task to the list
router.put('/:id/addtask',  authentication, UserAuth.listAuth, ListsController.addTask);

// Remove task from the list
router.put('/:id/removetask',  authentication, UserAuth.listAuth, ListsController.removeTask);

// Rename list
router.put('/:id/rename',  authentication, UserAuth.listAuth, ListsController.renameList);


module.exports = router;