const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
    res.render('home');
})






module.exports = router;