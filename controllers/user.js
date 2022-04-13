const userServices = require('../services/user');

const user = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const validUser = await userServices.validUser(email);
  if (validUser) {
    return res.status(409).json({ message: 'User already registered' });
  }
  const newUser = await userServices.create({ displayName, email, password, image });
  return res.status(201).json(newUser);
};

module.exports = user;