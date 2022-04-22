const express = require('express');

const router = express.Router();

const postController = require('../controllers/post');
const { authMiddleware, authUser } = require('../middleware/authMiddleware');
const { validTitle, validContent, validCategoryId } = require('../middleware/post');

router
 .post('/', validTitle, validContent, validCategoryId, authMiddleware, postController.create)
 .get('/', authMiddleware, postController.getAll)
 .get('/:id', authMiddleware, postController.getById)
 .put('/:id', validTitle, validContent, authMiddleware, authUser, postController.updatePost)
 .delete('/:id', authMiddleware, authUser, postController.deletePost);

module.exports = router;