const userServices = require('../services/user');
const { User } = require('../models');

const user = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const validUser = await userServices.validUser(email);
  if (validUser) {
    return res.status(409).json({ message: 'User already registered' });
  }
  const newUser = await userServices.create({ displayName, email, password, image });
  return res.status(201).json(newUser);
};

const getAll = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });
  return res.status(200).json(users);
};

module.exports = {
  user,
  getAll,
};