const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/tokenBlacklist.model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; 
  const isBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({
      message: "Token expired. Please login again",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.Organization = decoded;
    next();
  });
};

module.exports = authMiddleware;
