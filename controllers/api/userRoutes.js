const router = require('express').Router();
const { User } = require('../../models');

// SIGN UP
router.post('/', async (req, res) => {
  try {
    const signUpUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = signUpUserData.id;
      req.session.username = signUpUserData.username;
      req.session.logged_In = true;

      res.json(signUpUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// LOG IN
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_In = true;
      res.render('dashboard');
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
