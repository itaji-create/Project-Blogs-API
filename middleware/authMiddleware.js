const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const authMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not Authorized!!!' });
  }
};

module.exports = authMiddleware;