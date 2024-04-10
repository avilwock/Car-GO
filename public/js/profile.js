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
        
      //TODO: got get image url off screen and grab SRC pass along. 
      
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


//TODO: 
const cloudName = "hzxyensd5"; // replace with your own cloud name
const uploadPreset = "aoh4fpwm"; // replace with your own upload preset

// Remove the comments from the code below to add
// additional functionality.
// Note that these are only a few examples, to see
// the full list of possible parameters that you
// can add see:
//   https://cloudinary.com/documentation/upload_widget_reference

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  },
  (error, result) => { //when completed
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document//looking for element on screen
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url); //upliaded url for database 
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