const express = require("express");
const {createAccount, login} = require("../controller/auth.controller");
const router = express.Router();

router.post("/create", createAccount);
router.post('/login',login)

module.exports = router;
