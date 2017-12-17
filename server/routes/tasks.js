const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/tasks-controller')


// Get all tasks
router.get('/', TaskController.showAllTasks)

// Create new task
router.post('/', TaskController.createTask)

// Find One task
router.get('/:id', TaskController.findOneTask)

// Delete a task
router.delete('/:id', TaskController.deleteTask)

// Edit description field on a tasks
router.put('/:id/editdesc', TaskController.editDescription)

// Edit description field on a tasks
router.put('/:id/edittags', TaskController.editTags)

// Mark task as complete
router.put('/:id/complete', TaskController.complete)

// Mark task as outstanding
router.put('/:id/uncomplete', TaskController.uncomplete)

module.exports = router;