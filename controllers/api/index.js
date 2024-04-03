// Importing the express router module and creating a router instance
const router = require('express').Router();

// Importing userRoutes from the './userRoutes' file
const userRoutes = require('./userRoutes');

// Importing projectRoutes from the './projectRoutes' file
const projectRoutes = require('./projectRoutes');//this may change

// Mounting userRoutes under the '/users' endpoint
router.use('/users', userRoutes);

// Mounting projectRoutes under the '/projects' endpoint
router.use('/projects', projectRoutes);//this may change

// Exporting the router to make it available for use in other files
module.exports = router;
