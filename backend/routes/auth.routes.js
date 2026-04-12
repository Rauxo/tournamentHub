const express = require("express");
const {createAccount, login, logout, me} = require("../controller/auth.controller");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create', createAccount);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me',authMiddleware,me)

module.exports = router;
