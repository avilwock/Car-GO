document.addEventListener('DOMContentLoaded', function() {
  // Function to render posts using Mustache
  function renderPosts(posts) {
      const postListContainer = document.querySelector('.post-list');
      const postTemplate = `
          {{#each posts}}
          <div class="row mb-2">
              <div class="col-md-8">
                  <h4><a href="/api/posts/{{id}}">{{title}}</a></h4>
              </div>
              <div class="col-md-4">
                  <button class="btn btn-sm btn-danger delete-post" data-id="{{id}}">DELETE</button>
              </div>
          </div>
          {{/each}}
      `;
      const renderedPosts = Mustache.render(postTemplate, { posts: posts });
      postListContainer.innerHTML = renderedPosts;
  }

  // Initial rendering of posts
  renderPosts([]);

  // Event listener for the form submission to create a new post
  const newPostForm = document.querySelector('.new-post-form');
  newPostForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const title = document.getElementById('post-title').value;
      const content = document.getElementById('post-content').value;
      const imageUrl = document.getElementById('uploadedimage').getAttribute('src'); // Get uploaded image URL

      try {
          // Send POST request to create a new post
          const response = await fetch('/api/posts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  title: title,
                  content: content,
                  imageUrl: imageUrl // Include image URL in the post data
              })
          });

          if (response.ok) {
              // Reload the page to display the new post
              location.reload();
          } else {
              console.error('Failed to create post:', response.statusText);
          }
      } catch (error) {
          console.error('Error creating post:', error);
      }

      // Clear the form fields after submission
      document.getElementById('post-title').value = '';
      document.getElementById('post-content').value = '';
      document.getElementById('uploadedimage').setAttribute('src', ''); // Clear uploaded image
  });

  // Event listener for the delete post button
  document.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-post')) {
          const postId = event.target.dataset.id;
          // Do something with the postId, e.g., send a request to delete the post
          console.log("Post deleted with ID:", postId);
          // Optionally, you can remove the deleted post from the UI
          event.target.closest('.row').remove();
      }
  });

  // Cloudinary upload widget configuration
  const cloudName = "your_cloud_name"; // Replace with your cloud name
  const uploadPreset = "your_upload_preset"; // Replace with your upload preset

  const myWidget = cloudinary.createUploadWidget(
      {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
      },
      (error, result) => {
          if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);
              document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
          }
      }
  );

  document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
          myWidget.open();
      },
      false
  );
});
