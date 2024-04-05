const router = require('express').Router(); // Importing the express router module and creating a router instance

const userRoutes = require('./userRoutes');// Importing userRoutes from the './userRoutes' file
const commentRoutes = require('./commentRoutes'); // Importing commentRoutes from the './commentRoutes' file
const postRoutes = require('./postRoutes'); // Importing postRoutes from the './postRoutes' file
const carRoutes = require('./carRoutes');// Importing carRoutes from the './carRoutes' file

router.use('/users', userRoutes); // Mounting userRoutes under the '/users' endpoint
router.use('/comments', commentRoutes); // Mounting commentRoutes under the '/comments' endpoint
router.use('/posts', postRoutes); // Mounting postRoutes under the '/posts' endpoint
router.use('/cars', carRoutes); // Mounting carRoutes under the '/cars' endpoint

module.exports = router; // Exporting the router to make it available for use in other files

