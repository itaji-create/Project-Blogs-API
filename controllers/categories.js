const { Category } = require('../models');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
    create,
    getAll,
};