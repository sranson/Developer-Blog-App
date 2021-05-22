const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');


// When logged out user tries to access the dashboard, they  are routed to log in screen
// When I remove 'withAuth', I get a routing error
router.get('/', withAuth, async (req, res) => {
  res.render('layouts/dashboard');
});

// router.get('/new', withAuth, (req, res) => {
//   res.render('newPost', {
//     layout: 'dashboard',
//   });
// });

// router.get('/edit/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id);

//     if (postData) {
//       const post = postData.get({ plain: true });

//       res.render('editPost', {
//         layout: 'dashboard',
//         post,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.redirect('login');
//   }
// });

module.exports = router;
