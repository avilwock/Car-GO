// Import Sequelize
const Sequelize = require('sequelize');
// Require dotenv for security
require('dotenv').config();

// Create a variable to hold the sequelize instance
let sequelize;

// Establish Sequelize connection based on environment variables
sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
