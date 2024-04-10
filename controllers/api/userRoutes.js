const router = require('express').Router();
const { User, Post, Comment, Car } = require('../../models');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Car, attributes: ['id', 'make', 'model', 'year'] },
        { model: Post, attributes: ['id', 'title', 'content', 'photo', 'date_created' ]},
        { model: Comment, attributes: ['id', 'comment_text']},
      ]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get car by id
router.get('/:id', async (req, res) => {
  try {
    const users = await User.findByPk(req.params.id, {
      include: [
        { model: Car, attributes: ['id', 'make', 'model', 'year'] },
        { model: Post, attributes: ['id', 'title', 'content', 'photo', 'date_created' ]},
        { model: Comment, attributes: ['id', 'comment_text']},
      ]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create a new user
router.post('/', async (req, res) => {
  try {
    console.log('New user data:', req.body); // Log the new user data
    const newUser = await User.create(req.body);
    console.log('New user created:', newUser); // Log the newly created user
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating new user:', err); // Log any errors that occur
    res.status(400).json(err);
  }
});

router.post('/login', (req, res) => {
  User.findOne({
          where: {
              username: req.body.username // Finding user by username
          }
      }).then(dbUserData => {
          if (!dbUserData) {
              res.status(400).json({ message: 'No user with that username!' }); // Sending 400 status with error message if no user is found
              return;
          }
          const validPassword = dbUserData.checkPassword(req.body.password); // Checking password validity

          if (!validPassword) {
              res.status(400).json({ message: 'Incorrect password!' }); // Sending 400 status with error message if password is incorrect
              return;
          }
          req.session.save(() => {

              req.session.user_id = dbUserData.id; // Saving user ID to session
              req.session.username = dbUserData.username; // Saving user name to session
              req.session.logged_in = true; // Setting logged_in flag to true in session
              res.json({ user: dbUserData, message: 'You are now logged in!' });

              //res.redirect('/profile'); // Redirecting to dashboard after successful login
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err); // Handling errors
      });
});

// Route to logout a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.redirect('/'); // Redirecting to home page after logout
      });
  } else {
      res.status(404).end(); // Sending 404 status if no user is logged in
  }
});



// Update a car by id
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedUser[0]) {
      res.status(404).json({ message: 'User not found with this id' });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a car by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found with this id' });
      return;
    }
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


