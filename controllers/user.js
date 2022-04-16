const userServices = require('../services/user');
const { User } = require('../models');

const create = async (req, res) => {
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

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

module.exports = {
  create,
  getAll,
  getById,
};