const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
    res.render('home');
});


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    res.render('layouts/dashboard')
})




module.exports = router;