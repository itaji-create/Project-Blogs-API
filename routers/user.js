const express = require('express');

const router = express.Router();

const { validLogin, validEmail } = require('../middleware/user');
const userController = require('../controllers/user');

router
  .post('/', validLogin, validEmail, userController);

module.exports = router;