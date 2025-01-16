
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user && user.isAdmin) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error });
  }
};
