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

  // Create cars
  await Car.bulkCreate(carData);

  process.exit(0);
};

seedDatabase();