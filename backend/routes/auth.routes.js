const express = require("express");
const {createAccount} = require("../controller/auth.controller");
const router = express.Router();

router.post("/create", createAccount);

module.exports = router;
