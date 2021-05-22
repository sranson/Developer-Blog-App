const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');


// When logged out user tries to access the dashboard, they  are routed to log in screen
// When logged in user tries to access the dashboard, they get the dashboard screen
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
  res.render('posts', {
    layout: 'dashboard',
    posts,
  });
  } catch (err) {
    res.redirect('login')
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('newPost', {
    layout: 'dashboard',
  });
});



module.exports = router;
