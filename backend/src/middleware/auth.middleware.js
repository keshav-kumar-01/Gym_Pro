const jwt = require('jsonwebtoken');
const { createError } = require('../utils/error.utils');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createError(401, 'Access token required'));
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(createError(401, 'Token expired'));
    } else if (error.name === 'JsonWebTokenError') {
      return next(createError(401, 'Invalid token'));
    }

    next(createError(500, 'Authentication error'));
  }
};

module.exports = { authenticate };
