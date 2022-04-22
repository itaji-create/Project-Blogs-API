const { BlogPost, Category, User } = require('../models');

const create = async (body) => {
  const { title, content, categoryIds } = body;

  const post = await BlogPost.create({ title, content, userId: categoryIds[0] });
  return post;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { status: 404, content: { message: 'Post does not exist' } };
  return { status: 200, content: post };
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  deletePost,
};