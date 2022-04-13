const express = require('express');

const router = express.Router();

const userServices = require('../services/user');
const { validLogin, validEmail } = require('../middleware/user');

router
  .post('/', validLogin, validEmail, async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const user = await userServices.validUser(email);
    if (user) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const newUser = await userServices.create({ displayName, email, password, image });
    return res.status(201).json(newUser);
  });

module.exports = router;