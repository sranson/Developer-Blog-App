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







module.exports = router;