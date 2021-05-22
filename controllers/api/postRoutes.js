const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        userId: req.session.userId,
      });
  
      res.status(200).json(newProject);
      res.render('dashboard');
    } catch (err) {
      res.status(400).json(err);
    }
  });

// GET one post
router.get('/:id', withAuth, (req, res) => {
  Post.findOne({ id: req.body.id }).then((postData) => {
  res.json(postData);
  res.render('editPost');
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render('edit', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

// // // create a route to view one post as a logged IN user
// // Use withAuth middleware to prevent access to route
// router.get('/post/:id', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.userId, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });
//     res.render('onePost-loggedIn', {
//       ...user,
//       logged_In: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
      where: {
        id: req.params.id,
      },
    })
    .then((updatedPost) => {
      res.json(updatedPost);
      res.render('editPost', {
        layout: 'dashboard',
      });
    })
    .catch((err) => res.json(err));
  });

 





module.exports = router;