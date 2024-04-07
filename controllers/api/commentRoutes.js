const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

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
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json(err);
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
    res.status(400).json(err);
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
    res.json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


