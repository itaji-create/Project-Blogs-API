const express = require('express');

const router = express.Router();

const { validName, validPassword, validEmail } = require('../middleware/user');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/user');

router
  .post('/', validName, validPassword, validEmail, userController.user)
  .get('/', authMiddleware, userController.getAll);

module.exports = router;