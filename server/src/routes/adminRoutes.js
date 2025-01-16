const express = require('express');
const { getUsers, deleteReview } = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/users', verifyAdmin, getUsers);


router.delete('/reviews/:id', verifyAdmin, deleteReview);

module.exports = router;
