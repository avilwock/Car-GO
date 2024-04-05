const sequelize = require('./userData.json');
const { User, Post, Comment, Car } = require('../models'); //Replace with amanda's information

const userData = require('./userData.json');
const postData = require('./postData.json');//replace with the next file ont his seeds folder
const commentData = require('./commentData.json');//replace with the next file ont his seeds folder
const carData = require('./carData.json');//replace with the next file ont his seeds folder



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();