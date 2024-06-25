// Import Sequelize
const Sequelize = require('sequelize');
// Require dotenv for security
require('dotenv').config();

// Create a variable to hold the sequelize instance
let sequelize;

if (process.env.DATABASE_URL) {
  // Use DATABASE_URL for Render PostgreSQL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // You might need to adjust this based on your setup
      }
    }
  });
} else {
  // If DATABASE_URL is not set, use local MySQL
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
