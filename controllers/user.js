const userServices = require('../services/user');
const { User } = require('../models');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const validUser = await userServices.validUser(email);
    if (validUser) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const newUser = await userServices.create({ displayName, email, password, image });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userServices.deleteUser(req.user.dataValues.id);
    return res.status(204).json({ message: 'Usuário excluido' });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  deleteUser,
};