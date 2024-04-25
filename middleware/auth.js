// Middleware to authenticate users using JWT

const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  } 

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({
        message: "invalid user",
      });
    }
  } catch (err) {
    return res.status(403).json({
      message: "invalid user",
    });
  }
};

module.exports = {
  authMiddleware,
};