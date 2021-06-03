const router = require('express').Router();
const { Post, User, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        include: [User,Comment],
      });
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render('posts-loggedOut', { 
        layout: 'main',
        posts, 
        logged_In: req.session.logged_In 
      });
      // res.json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });



router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const posts = postData.get({ plain: true });
      res.render("onePost-loggedIn", { posts });
      // res.json(posts)
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', async (req, res) => {
  req.session.logged_In = false;
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
     // Serialize data so the template can read it
     const posts = postData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
    res.render('posts-loggedOut', { 
      posts, 
      logged_In: req.session.logged_In 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;