const express = require('express');
const { getIndex, postTweet,getTweet, getTweetById } = require('../controllers/index.controller');

const router = express.Router();


router.get('/',getIndex);

router.post('/tweet',postTweet);

router.get('/tweet',getTweet);

router.get('/tweet/:id',getTweetById);

module.exports = router;