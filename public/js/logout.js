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

  // Assuming you have a logout button with the id 'logout'
  console.log('Logout button clicked');
  // Adding click event listener to the logout button
  document.querySelector('#logout').addEventListener('click', async function(event) {
    // Prevent default behavior of the button (e.g., form submission)
    event.preventDefault();
    try {
      await logout(); // Call the logout function
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out');
    }
  });
  const logout = async () => {
    // This calls for the logout screen
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // This calls for the login screen if failing to logout
      document.location.replace('/login');
    } else {
      throw new Error('Failed to log out');
    }
  };
});
