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


router.post('/dashboard', async (req, res) => {
  try {
    // Log the request body
    console.log('Request Body:', req.body);

    // Extract data from the request body
    const { title, content, photo } = req.body;

    // Create a new post using the extracted data
    const newPost = await Post.create({
      title: title,
      content: content,
      photo: photo,

      // Optionally, include any other data you need to save with the post
    });

    // Optionally, perform additional actions like sending a response or redirecting
    res.status(201).json({ message: 'Post created successfully', });
  } catch (error) {
    // Handle errors
    console.error('Error handling form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

