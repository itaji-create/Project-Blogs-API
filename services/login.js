const { User } = require('../models');

const authUser = async (email) => {
  const user = await User.findOne({
    where: { email }, attributes: { exclude: ['password'] },
  });
  return user;
};

module.exports = {
  authUser,
};