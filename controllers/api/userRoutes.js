// Importing required modules and models
const router = require('express').Router(); // Creating an Express router instance
const { User } = require('../../models'); // Importing the User model from the specified path

// Route for creating a new user
router.post('/', async (req, res) => {
  try {
    // Creating a new user with the data received in the request body
    const userData = await User.create(req.body);

    // Saving user session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Sending a JSON response with the created user data
      res.status(200).json(userData);
    });
  } catch (err) {
    // Handling errors and sending an error response
    res.status(400).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Finding a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If user data is not found, sending an error response
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Checking if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    // If password is invalid, sending an error response
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Saving user session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      // Sending a JSON response with user data and a success message
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Handling errors and sending an error response
    res.status(400).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  // Checking if user is logged in
  if (req.session.logged_in) {
    // Destroying user session
    req.session.destroy(() => {
      // Sending a success response
      res.status(204).end();
    });
  } else {
    // Sending a not found response if user session is not found
    res.status(404).end();
  }
});

// Exporting the router
module.exports = router;

