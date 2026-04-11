const express = require('express');
const router = express.Router(); // Create a new router object
const {crateAccount, login} = require('../controllers/auth.conntroller')

router.post('/create',crateAccount);
router.post('/login',login);

module.exports = router;