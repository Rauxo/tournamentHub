const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { addResult, deleteResult, updateResult, getResult } = require('../controller/result.controller');

const router = express.Router();

//add result
router.post('/add/:id',authMiddleware,addResult);

//delete result
router.delete('/delete/:id',authMiddleware,deleteResult);

//update
router.put('/update/:id',authMiddleware,updateResult);

//get all result
router.get('/:id',getResult);

module.exports = router;