const postServices = require('../services/post');

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
    const posts = await postServices.getAll();

    return res.status(200).json(posts);    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postServices.getById(id); 
    return res.status(result.status).json(result.content);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;
    if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
    const result = await postServices.getById(id);

    if (result.status === 200) {
      result.content.title = title;
      result.content.content = content;
      // await post.save();
    }

    return res.status(result.status).json(result.content);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postServices.getById(id);
    if (!result) return res.status(result.status).json(result.content);
    await postServices.deletePost(Number(id));

    return res.status(204).json({ message: 'Post excluído com sucesso!' });
    } catch (error) {
    return res.status(500).json(error.message);
  }
};

const search = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await postServices.getAll();
    const postsByContent = posts.filter((e) => e.content.includes(q));
    if (postsByContent.length === 0 || postsByContent.length === posts.length) {
      const postsByTitle = posts.filter((e) => e.title.includes(q));
      return res.status(200).json(postsByTitle);
    }
    return res.status(200).json(postsByContent);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updatePost,
  deletePost,
  search,
};