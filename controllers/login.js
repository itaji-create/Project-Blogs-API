const jwt = require('jsonwebtoken');
const loginServices = require('../services/login');

const secret = 'seusecretdetoken';

const login = async (req, res) => {
  const { email, password } = req.body;

  const exist = await loginServices.authUser(email, password);
  if (!exist) return res.status(400).json({ message: 'Invalid fields' });

  const jwtConfig = {
      expiresIn: '15m',
      algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = login;