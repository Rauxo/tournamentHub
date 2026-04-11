const express = require("express");
const router = express.Router();

const {
  createAccount,
  login,
  logout,
  getLoggedInUser,
} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/create", createAccount);
router.post("/login", login);
router.post("/logout", logout);
router.get("/loggedin", authMiddleware, getLoggedInUser);

module.exports = router;
