const { verifyToken } = require('../config/auth');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token Verification Error:", err); // Log error untuk debugging
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
