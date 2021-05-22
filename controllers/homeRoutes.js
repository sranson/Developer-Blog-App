const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
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
        layout: 'main',
        posts, 
        logged_In: req.session.logged_In 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// create a route to view one post as a logged OUT user
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('onePost-loggedOut', {
      ...post,
    });
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
    res.render('posts', { 
      posts, 
      logged_In: req.session.logged_In 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;