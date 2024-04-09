document.addEventListener('DOMContentLoaded', function() {
    // Assuming you have a logout button with the class 'logout-btn'
    console.log('Logout button clicked');
    const logoutButton = document.querySelector('.logout-btn');
  
    // Adding click event listener to the logout button
    logoutButton.addEventListener('click', function(event) {
      // Prevent default behavior of the button (e.g., form submission)
      event.preventDefault();
  
      // Perform logout operation here, such as sending a request to the server to invalidate the session
  
      // After successful logout, redirect the user to the login page
      window.location.href = '/login'; // Replace '/login' with the actual URL of your login page
    });
});
