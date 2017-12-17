const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories-controller');
const authentication  = require('../controllers/authentication') 
const UserAuth = require('../controllers/user-auth')
// Find one category
router.get('/:id', authentication, UserAuth.catAuth, CategoriesController.findOneCategory)

// Create new category
router.post('/', authentication, CategoriesController.createCategory);

// Delete category
router.delete('/:id', authentication, UserAuth.catAuth, CategoriesController.deleteCategory);

// Add new task to the category
router.put('/:id/addlist', authentication, UserAuth.catAuth, CategoriesController.addList);

// Remove task from the category
router.put('/:id/removelist', authentication, UserAuth.catAuth, CategoriesController.removeList);

// Rename category
router.put('/:id/rename', authentication, UserAuth.catAuth, CategoriesController.renameCategory);


module.exports = router;