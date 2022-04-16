const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const authMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;

  try {
    if (!token) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(token, secret);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;