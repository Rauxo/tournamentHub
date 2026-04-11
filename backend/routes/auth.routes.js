const express = require('express');
const router = express.Router(); // Create a new router object
const {crateAccount} = require('../controllers/auth.conntroller')

router.post('/create',crateAccount);

module.exports = router;