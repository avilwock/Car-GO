document.addEventListener('DOMContentLoaded', function() {
  // Function to delete post
  async function deleteFormHandler(event) {
    event.preventDefault();

    const postId = document.querySelector('.delete-post-btn').getAttribute('data-id');

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        // If successful, redirect the browser to the profile page
        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post.');
    }
}

  // Find the delete button and attach the event listener
  const deleteButton = document.querySelector('.delete-post-btn');
  if (deleteButton) {
    deleteButton.addEventListener('click', deleteFormHandler);
  }

  // Function to handle form submission for editing post
  async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();

    const id = window.location.toString().split('/').pop();

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Redirect to the profile page after successful update
        document.location.replace('/profile');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('An error occurred while updating the post.');
    }
  }

  // Attach the event listener for the form submission
  const editPostForm = document.querySelector('.edit-post-form');
  if (editPostForm) {
    editPostForm.addEventListener('submit', editFormHandler);
  }
});
