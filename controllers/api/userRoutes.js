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


// Create a new car
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
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


