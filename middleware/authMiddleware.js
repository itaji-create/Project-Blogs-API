const jwt = require('jsonwebtoken');

const loginService = require('../services/login');

const secret = 'seusecretdetoken';

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(401).json({ message: 'Token not found' });
  
    const decoded = jwt.verify(token, secret);    
    const user = decoded.data;
    const exist = await loginService.authUser(user.email);
    if (!exist) return res.status(400).json({ message: 'User not found' });
    req.user = exist;
      
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;