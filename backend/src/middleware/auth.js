
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../config/jwt');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; 
    try {
      const user = verifyToken(token);
      req.user = user; 
    } catch (error) {
      console.warn('Invalid token', error);
    }
  }
  next();
};

module.exports = authMiddleware;
