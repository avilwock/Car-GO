document.addEventListener('DOMContentLoaded', function() {
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
