const postServices = require('../services/post');
const { BlogPost, User } = require('../models');

const create = async (req, res) => {
  try {
    const post = await postServices.create(req.body);
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: { model: User, as: 'user' },
    });
    return res.status(200).json(posts);    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  create,
  getAll,
};