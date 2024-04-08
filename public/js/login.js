document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get input values
      const username = document.getElementById('username-login').value;
      const password = document.getElementById('password-login').value;
  
      // Example validation (you should perform proper validation)
      if (!username || !password) {
        alert('Please enter both username and password.');
        return;
      }
  
      // Example AJAX request to send login data to the server
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed.');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful login (e.g., redirect to dashboard)
        window.location.href = '/dashboard';
      })
      .catch(error => {
        // Handle login error (e.g., display error message)
        alert(error.message);
      });
    });
});
