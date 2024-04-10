const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth'); // Middleware for authentication

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: Post, attributes: ['id', 'title', 'content', 'photo', 'date_created'] },
        { model: User, attributes: ['id', 'username', 'email', 'experience_level'] },
      ]
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get comment by id
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { model: Post, attributes: ['id', 'title', 'content', 'photo', 'date_created'] },
        { model: User, attributes: ['id', 'username', 'email', 'experience_level'] },
      ]
    });
    if (!comment) {
      res.status(404).json({ message: 'Comment not found with this id' });
      return;
    }
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad Request' });
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
      const { comment_text, post_id } = req.body; // Extracting comment text and post ID from request body
      const user_id = req.session.user_id; // Extracting user ID from session

      // Creating a new comment
      const newComment = await Comment.create({
          comment_text,
          post_id,
          user_id
      });

      res.redirect('/')

      // Send a response indicating success along with the newly created comment
      // res.status(201).json(newComment);
  } catch (error) {
      // Handle errors
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a comment by id
router.put('/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedComment[0]) {
      res.status(404).json({ message: 'Comment not found with this id' });
      return;
    }
    res.json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad Request' });
  }
});

// Delete a comment by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedComment) {
      res.status(404).json({ message: 'Comment not found with this id' });
      return;
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;



