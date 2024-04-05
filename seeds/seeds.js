const sequelize = require('../config/connection.js');
const { User, Post, Comment, Car } = require('../models'); //Replace with amanda's information

const userData = require('./userData.json');
const postData = require('./postData.json');//replace with the next file ont his seeds folder
const commentData = require('./commentData.json');//replace with the next file ont his seeds folder
const carData = require('./carData.json');//replace with the next file ont his seeds folder



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create car records
  const cars = await Car.bulkCreate(carData);

  // Update user data with correct car_id
  const updatedUserData = userData.map((user, index) => {
    if (user.car_id) {
      user.car_id = cars.find(car => car.year === carData[index].year).id;
    }
    return user;
  });

  // Create users with updated data
  const users = await User.bulkCreate(updatedUserData, {
    individualHooks: true,
    returning: true,
  });

  // Your existing code to create posts can follow here

  process.exit(0);
};

seedDatabase();
