const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { getAllTournament, getTournamentById, addTournament, updateTournament, deleteTournament } = require('../controller/tournament.controller');
const router = express.Router();

//get All Tournament
router.get('/',getAllTournament);

//get Tournament by id
router.get('/:tournamentId',getTournamentById)

//Add tournament
router.post('/add',authMiddleware,addTournament);

//update 
router.put('/update/:id', authMiddleware,updateTournament);

//delete
router.delete('/delete/:TournamentId', authMiddleware,deleteTournament)

module.exports = router;