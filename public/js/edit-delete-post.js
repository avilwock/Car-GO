async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim(); // Updated to 'content'

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
      // Redirect to the dashboard page after successful update
      document.location.replace('/profile');
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error updating post:', error);
    alert('An error occurred while updating the post.');
  }
}



document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

// function to delete post
async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/").pop(); // Simplified getting id
 
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
// If successful, redirect the browser to the dashboard page
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);