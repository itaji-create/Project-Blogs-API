const { User } = require('../models');

const validUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const create = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

module.exports = {
  create,
  validUser,
};