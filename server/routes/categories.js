const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories-controller');

// Find one category
router.get('/:id', CategoriesController.findOneCategory)

// Create new category
router.post('/', CategoriesController.createCategory);

// Delete category
router.delete('/:id', CategoriesController.deleteCategory);

// Add new task to the category
router.put('/:id/addlist', CategoriesController.addList);

// Remove task from the category
router.put('/:id/removelist', CategoriesController.removeList);

// Rename category
router.put('/:id/rename', CategoriesController.renameCategory);


module.exports = router;