const express = require('express');

const router = express.Router();

const postController = require('../controllers/post');
const authMiddleware = require('../middleware/authMiddleware');
const { validTitle, validContent, validCategoryId } = require('../middleware/post');

router
 .post('/', validTitle, validContent, validCategoryId, authMiddleware, postController.create)
 .get('/', authMiddleware, postController.getAll);

module.exports = router;