const PostCategory = (sequelize, DataTypes) => {
  const post = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  { timestamps: false });

  return post;
};

module.exports = PostCategory;