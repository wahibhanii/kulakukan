const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/tasks-controller')
const authentication  = require('../middleware/authentication') 
const UserAuth = require('../middleware/user-auth')

// Get all tasks
router.get('/', authentication, UserAuth.taskAuth, TaskController.showAllTasks)

// Create new task
router.post('/', authentication, TaskController.createTask)

// Find One task
router.get('/:id', authentication, UserAuth.taskAuth, TaskController.findOneTask)

// Delete a task
router.delete('/:id', authentication, UserAuth.taskAuth, TaskController.deleteTask)

// Edit description field on a tasks
router.put('/:id/editdesc', authentication, UserAuth.taskAuth, TaskController.editDescription)

// Edit tags field on a tasks
router.put('/:id/edittags', authentication, UserAuth.taskAuth, TaskController.editTags)

// Mark task as complete
router.put('/:id/complete', authentication, UserAuth.taskAuth, TaskController.complete)

// Mark task as outstanding
router.put('/:id/uncomplete', authentication, UserAuth.taskAuth, TaskController.uncomplete)

module.exports = router;