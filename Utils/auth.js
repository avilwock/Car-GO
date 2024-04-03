// Middleware function to check if the user is logged in
const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      res.redirect('/login'); // Redirecting to the login route if not logged in
    } else {
      next(); // Proceeding to the next middleware or route handler if logged in
    }
  };
  
  // Exporting the withAuth middleware function
  module.exports = withAuth;
  