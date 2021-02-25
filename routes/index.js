const express = require('express');
const { getIndex, postTweet,getTweet, getTweetById, deleteTweetById } = require('../controllers/index.controller');

const router = express.Router();


router.get('/',getIndex);

router.post('/delete',deleteTweetById)

router.post('/tweet',postTweet);

router.get('/tweet',getTweet);

router.get('/tweet/:id',getTweetById);

module.exports = router;