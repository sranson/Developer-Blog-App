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
      res.render('posts', { 
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
      logged_in: req.session.logged_In
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// // create a route to view one post as a logged IN user
// Use withAuth middleware to prevent access to route
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('onePost-loggedIn', {
      ...user,
      logged_In: true
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