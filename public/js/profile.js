document.addEventListener('DOMContentLoaded', function() {
    // Function to render posts using Mustache
    function renderPosts(posts) {
      const postListContainer = document.querySelector('.post-list');
      const postTemplate = `
        {{#each posts}}
        <div class="row mb-2">
          <div class="col-md-8">
            <h4><a href="/posts/{{id}}">{{title}}</a></h4>
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
  
    // Example data for demonstration
    const postsData = [
      { id: 1, title: "First Post" },
      { id: 2, title: "Second Post" },
      { id: 3, title: "Third Post" }
    ];
  
    // Initial rendering of posts
    renderPosts(postsData);
  
    // Example event listener for the form submission to create a new post
    const newPostForm = document.querySelector('.new-post-form');
    newPostForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('post-title').value;
      const content = document.getElementById('post-content').value;
      // Do something with the title and content, e.g., send them to the server
      console.log("New post created with title:", title, "and content:", content);
      // Clear the form fields after submission
      document.getElementById('post-title').value = '';
      document.getElementById('post-content').value = '';
    });
  
    // Example event listener for the delete post button
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-post')) {
        const postId = event.target.dataset.id;
        // Do something with the postId, e.g., send a request to delete the post
        console.log("Post deleted with ID:", postId);
        // Optionally, you can remove the deleted post from the UI
        event.target.closest('.row').remove();
      }
    });
});
