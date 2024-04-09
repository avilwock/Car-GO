// Example JS file for handling form submission to add new posts
document.addEventListener('DOMContentLoaded', function() {
    const newPostForm = document.querySelector('.new-post-form');
    
    newPostForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('post-title').value;
      const content = document.getElementById('post-content').value;
  
      // Example validation (you should perform proper validation)
      if (!title || !content) {
        alert('Please enter both title and content for the post.');
        return;
      }
  
      // Example AJAX request to send new post data to the server
      fetch('/api/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, content: content })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add post.');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful post addition (e.g., show success message)
        alert('Post successfully added!');
        // Optionally, you can redirect to another page after successful addition
        window.location.href = '/dashboard';
      })
      .catch(error => {
        // Handle post addition error (e.g., display error message)
        console.error('Error adding post:', error);
        alert('Failed to add post');
      });
    });
  });
  
  