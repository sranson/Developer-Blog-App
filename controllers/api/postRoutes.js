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
router.get('/:id', (req, res) => {
  Post.findOne({ id: req.body.id }).then((postData) => {
    res.json(postData);
  });
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
    })
    .catch((err) => res.json(err));
  });

 





module.exports = router;