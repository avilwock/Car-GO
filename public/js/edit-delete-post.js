// Example JS file for handling form submission to edit or delete posts
document.addEventListener('DOMContentLoaded', function() {
    // Example event listener for form submission to edit a post
    const editPostForm = document.querySelector('.edit-post-form');
    editPostForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // Get input values or serialized form data
      const postId = document.getElementById('post-id').value;
      const updatedTitle = document.getElementById('post-title').value;
      const updatedContent = document.getElementById('post-content').value;
      // Example AJAX request to send updated post data to the server for editing
      fetch(`/api/posts/${postId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to edit post.');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful post edit (e.g., show success message)
        alert('Post successfully edited!');
      })
      .catch(error => {
        // Handle post edit error (e.g., display error message)
        console.error('Error editing post:', error);
        alert('Failed to edit post');
      });
    });
  
    // Example event listener for deleting a post
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-post')) {
        const postId = event.target.dataset.id;
        // Example AJAX request to delete a post
        fetch(`/api/posts/${postId}/delete`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete post.');
          }
          return response.json();
        })
        .then(data => {
          // Handle successful post deletion (e.g., remove post from UI)
          event.target.closest('.row').remove();
          alert('Post successfully deleted!');
        })
        .catch(error => {
          // Handle post deletion error (e.g., display error message)
          console.error('Error deleting post:', error);
          alert('Failed to delete post');
        });
      }
    });
  });
  