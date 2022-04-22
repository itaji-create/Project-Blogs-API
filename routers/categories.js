const express = require('express');

const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const categoriesController = require('../controllers/categories');

router
  .post('/', authMiddleware, categoriesController.create)
  .get('/', authMiddleware, categoriesController.getAll);

module.exports = router;