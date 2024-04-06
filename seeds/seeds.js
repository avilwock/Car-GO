const sequelize = require('../config/connection.js');
const { User, Post, Comment, Car } = require('../models'); //Replace with amanda's information

const userData = require('./userData.json');
const postData = require('./postData.json');//replace with the next file ont his seeds folder
const commentData = require('./commentData.json');//replace with the next file ont his seeds folder
const carData = require('./carData.json');//replace with the next file ont his seeds folder



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create car records
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Update user data with correct car_id
  const updatedCarData = carData.map((car, index) => {
    if (car.user_id) {
      car.user_id = users[index].id;
    }
    return car;
  });

  // Create users with updated data
await Car.bulkCreate(updatedCarData);
  // Your existing code to create posts can follow here

  process.exit(0);
};

seedDatabase();
