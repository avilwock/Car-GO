const sequelize = require('../config/connection.js');
const { User, Post, Comment, Car } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const carData = require('./carData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create posts
  const posts = await Post.bulkCreate(postData);

  // Create comments
  const comments = await Comment.bulkCreate(commentData);

  // Assign posts and comments to users
  await Promise.all(users.map(async (user, index) => {
    if (postData[index]) {
      await user.createPost(postData[index]);
    }
    if (commentData[index]) {
      await user.createComment(commentData[index]);
    }
  }));

  // Create cars
  await Car.bulkCreate(carData);

  process.exit(0);
};

seedDatabase();