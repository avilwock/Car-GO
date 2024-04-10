const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: [ 'id', 'username' ] }, 
        { model: Comment, attributes: ['id', 'comment_text', 'date_created', 'user_id'],
          include: [
            { model: User, attributes: ['id', 'username'] }
          ] 
        }
      ],
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET route to render single post page
router.get('/:id', async (req, res) => {
  try {
    // Fetch the specific post data
    const postData = await Post.findByPk(req.params.id, {
      // Include any associated data you need (e.g., user, comments)
      include: [
        { model: User, attributes: ['id', 'username'] }, 
        { 
          model: Comment, 
          attributes: ['id', 'comment_text', 'date_created', 'user_id'],
          include: [
            { model: User, attributes: ['id', 'username'] }
          ] 
        }
      ],
    });
    if (!postData) {
      return res.status(404).json({ message: 'Post not found with this id' });
    }
    const post = postData.get({ plain: true });
    res.render('singlepost', {post: post})
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
    console.error(err);
    res.status(400).json({ message: 'Bad Request' });
  }
});

// PUT route to update a post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (updatedPost[0] === 0) {
      // If no rows were updated, return 404 Not Found
      res.status(404).json({ message: 'No post found with this id' });
    } else {
      // If the post was successfully updated, return 200 OK
      res.status(200).json({ message: 'Post updated successfully' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ message: 'Post not found with this id' });
    }
    res.json(deletedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

