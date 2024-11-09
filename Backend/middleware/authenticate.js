const jwt = require('jsonwebtoken');

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token is required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }
    req.userId = decoded.id; // Attach user info to the request
    next();
  });
};

module.exports = authenticate;
