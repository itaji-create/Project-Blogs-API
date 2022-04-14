const express = require('express');

const router = express.Router();

const { validName, validPassword, validEmail } = require('../middleware/user');
const userController = require('../controllers/user');

router
  .post('/', validName, validPassword, validEmail, userController);

module.exports = router;