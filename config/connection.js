// Imports Sequelize
const Sequelize = require('sequelize');
// Requires .env for security
require('dotenv').config();

// Establish Sequelize connection based on environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false // Disable logging (optional)
  }
);

module.exports = sequelize;
