const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { submitForm, getAllParticipants, getParticipantById } = require('../controller/participant.controller');

const router = express.Router();

//Registration
router.post('/submit/:tournamentId',submitForm);

//get all participant
router.get('/',authMiddleware,getAllParticipants);

//get participent by id
router.get('/:id',authMiddleware,getParticipantById);


module.exports = router;