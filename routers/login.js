const express = require('express');

const router = express.Router();
const { validPassword, validEmail } = require('../middleware/user');
const loginController = require('../controllers/login');

router
  .post('/', validEmail, validPassword, loginController);

module.exports = router;
