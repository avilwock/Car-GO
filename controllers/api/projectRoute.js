// Importing the express router module and creating a router instance
//Project is the placeholder. 
const router = require('express').Router();

// Importing the Project model from the models directory
const { Project } = require('../../models');

// Importing the withAuth middleware from the utils directory
const withAuth = require('../../utils/auth');

// Route for creating a new project
router.post('/', withAuth, async (req, res) => {
  try {
    // Creating a new project with data from the request body
    const newProject = await Project.create({
      ...req.body,             // Using spread operator to include all properties from the request body
      user_id: req.session.user_id, // Assigning the user_id from the session to the new project
    });

    // Sending a JSON response with the newly created project and status code 200 (OK)
    res.status(200).json(newProject);
  } catch (err) {
    // Handling errors and sending a JSON response with the error message and status code 400 (Bad Request)
    res.status(400).json(err);
  }
});

// Route for deleting a project by its id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Deleting the project with the specified id and user_id from the database
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,            // Getting the id of the project from the URL parameters
        user_id: req.session.user_id, // Ensuring that the project belongs to the current user
      },
    });

    // If no project was deleted, send a JSON response with status code 404 (Not Found) and a message
    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    // Sending a JSON response with the deleted project data and status code 200 (OK)
    res.status(200).json(projectData);
  } catch (err) {
    // Handling errors and sending a JSON response with the error message and status code 500 (Internal Server Error)
    res.status(500).json(err);
  }
});

// Exporting the router to make it available for use in other files
module.exports = router;

