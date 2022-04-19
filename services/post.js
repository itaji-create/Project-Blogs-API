const { BlogPost } = require('../models');
const { Category } = require('../models');

const create = async (body) => {
  const { title, content, categoryIds } = body;

  const post = await BlogPost.create({ title, content, userId: categoryIds[0] });
  return post;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};