const router = require('express').Router();
const { User, Car, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Car }, { model: Comment }, { model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          include: User,
        },
        User
      ]
    });

    console.log(posts); // Add this line to log the posts data


 res.render('homepage', { posts, logged_in: req.session.logged_in })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error'})
  }
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

module.exports = router;

