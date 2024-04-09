const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: [ 'id', 'username' ] }, 
        { model: Comment, attributes: ['id', 'comment_text', 'user_id'],
          include: [
            {
              model: User,
              attributes: ['id', 'username']
            }
          ] }],
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'})
  }
});

// GET route to render single post page
router.get('/:id', async (req, res) => {
  try {
    // Fetch the specific post data
    const postData = await Post.findByPk(req.params.id, {
      // Include any associated data you need (e.g., user, comments)
      include: [{ model: User }, { model: Comment }],
    });
    if (!postData) {
      return res.status(404).json({ message: 'Post not found with this id' });
    }
    // Render the singlepost.handlebars template with the fetched post data
    res.render('singlepost', { postData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post by id
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'Post not found with this id' });
      return;
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found with this id' });
      return;
    }
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
