const express = require('express');
const { getAllOrganizers } = require('../controller/Organizr.controller');

const router = express.Router()

router.get("/", getAllOrganizers);
module.exports = router;