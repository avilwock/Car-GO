const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to display a user's own posts
router.get('/posts', withAuth, async (req, res) => {
  try {
    // Find all posts belonging to the logged-in user
    const posts = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [{ model: User }] // Include the user information for each post
    });
    res.render('user-posts', { posts }); // Render a template to display user's posts
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display a form to edit a post
// router.get('/posts/:id/edit', withAuth, async (req, res) => {
//   try {
//     // Find the post by id belonging to the logged-in user
//     const post = await Post.findOne({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id
//       }
//     });
//     if (!post) {
//       res.status(404).json({ message: 'Post not found' });
//       return;
//     }
//     res.render('edit-post', { post }); // Render a form to edit the post
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Testroute
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id // Finding post by its ID
          },
          attributes: ['id', 'title', 'content', 'date_created'], // Selecting specific attributes of the post
          include: [{ // Including associated models User and Comment
                  model: User,
                  attributes: ['username'] // Including the user's name in the result
              },
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' }); // Sending 404 status with error message if no post is found
              return;
          }

          const post = dbPostData.get({ plain: true }); // Converting Sequelize data to plain object
          res.render('edit-deletepost', { post, logged_in: true }); // Rendering the "edit-post" template with post data and logged_in flag set to true
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err); // Handling errors
      });
})



// Route to handle the update of a post
router.put('/posts/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Post not found or you are not authorized to edit it' });
      return;
    }
    res.status(200).end(); // Send a success response
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  try {
    res.render('addpost', { logged_in: true }); // Rendering the "add-post" template with logged_in flag set to true
  } catch (error) {
    console.error('Error rendering add post page:', error); // Logging error if encountered
    res.status(500).json('Internal server error'); // Sending 500 status with error message if an error occurs
  }
});


module.exports = router;
