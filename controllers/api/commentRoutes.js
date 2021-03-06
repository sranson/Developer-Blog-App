const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.commentContent,
      user_id: req.session.userId,
      postId: req.body.postId
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;