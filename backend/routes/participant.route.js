const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { submitForm } = require('../controller/participant.controller');

const router = express.Router();

//Registration
router.post('/submit/:tournamentId',submitForm)

//get all participant
// router.get('/',authMiddleware)

//get participent by id
// router.get('/:id',authMiddleware)


module.exports = router;