const express = require('express');
const router = express.Router();
const ListsController = require('../controllers/lists-controller');

// Find one list
router.get('/:id', ListsController.findOneList)

// Create new list
router.post('/', ListsController.createList);

// Delete list
router.delete('/:id', ListsController.deleteList);

// Add new task to the list
router.put('/:id/addtask', ListsController.addTask);

// Remove task from the list
router.put('/:id/removetask', ListsController.removeTask);

// Rename list
router.put('/:id/rename', ListsController.renameList);


module.exports = router;