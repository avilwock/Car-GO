const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all users, posts, or comments
router.get('/', async (req, res) => {
  try {
    let data;
    if (req.query.model === 'user') {
      data = await User.findAll();
    } else if (req.query.model === 'post') {
      data = await Post.findAll();
    } else if (req.query.model === 'comment') {
      data = await Comment.findAll();
    } else {
      return res.status(400).json({ message: 'Invalid model specified' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user, post, or comment by id
router.get('/:id', async (req, res) => {
  try {
    let data;
    if (req.query.model === 'user') {
      data = await User.findByPk(req.params.id);
    } else if (req.query.model === 'post') {
      data = await Post.findByPk(req.params.id);
    } else if (req.query.model === 'comment') {
      data = await Comment.findByPk(req.params.id);
    } else {
      return res.status(400).json({ message: 'Invalid model specified' });
    }
    if (!data) {
      return res.status(404).json({ message: `${req.query.model} not found with this id` });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user, post, or comment
router.post('/', async (req, res) => {
  try {
    let data;
    if (req.body.model === 'user') {
      data = await User.create(req.body);
    } else if (req.body.model === 'post') {
      data = await Post.create(req.body);
    } else if (req.body.model === 'comment') {
      data = await Comment.create(req.body);
    } else {
      return res.status(400).json({ message: 'Invalid model specified' });
    }
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a user, post, or comment by id
router.put('/:id', async (req, res) => {
  try {
    let data;
    if (req.body.model === 'user') {
      data = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
    } else if (req.body.model === 'post') {
      data = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
    } else if (req.body.model === 'comment') {
      data = await Comment.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
    } else {
      return res.status(400).json({ message: 'Invalid model specified' });
    }
    if (data[0] === 0) {
      return res.status(404).json({ message: `${req.body.model} not found with this id` });
    }
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a user, post, or comment by id
router.delete('/:id', async (req, res) => {
  try {
    let data;
    if (req.query.model === 'user') {
      data = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
    } else if (req.query.model === 'post') {
      data = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
    } else if (req.query.model === 'comment') {
      data = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
    } else {
      return res.status(400).json({ message: 'Invalid model specified' });
    }
    if (data === 0) {
      return res.status(404).json({ message: `${req.query.model} not found with this id` });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


