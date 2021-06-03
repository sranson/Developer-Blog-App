const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        userId: req.session.userId,
      });
  
      res.status(200).json(newPost);
      res.render('dashboard');
    } catch (err) {
      res.status(400).json(err);
    }
  });

// GET one post
// router.get('/:id', withAuth, (req, res) => {
//   Post.findByPk({ id: req.body.id }).then((postData) => {
//   res.json(postData);
//   res.render('editPost');
//   });
// });


// router.get('/:id', withAuth, (req, res) => {
//   console.log('GOT IT');
// });


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

  router.delete('/:id', (req, res) => {
    // Looks for the books based on isbn given in the request parameters and deletes the instance from the database
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedPost) => {
        res.json(deletedPost);
        // res.render('/dashboard');
      })
      .catch((err) => res.json(err));
  });





module.exports = router;