document.addEventListener('DOMContentLoaded', function() {
  let imageUrl;
  
  // Cloudinary upload widget configuration
  const cloudName = "dz4oq10ph"; // Replace with your cloud name
  const uploadPreset = "User_Image_Uploads"; // Replace with your upload preset

  const myWidget = cloudinary.createUploadWidget(
      {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
      },
      (error, result) => {
          if (error) {
              console.error('Error uploading image:', error);
          } else if (result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);

              // Get the URL of the uploaded image
              imageUrl = result.info.secure_url;

              // Set the uploaded image URL as the source attribute
              document.getElementById("uploadedimage").setAttribute("src", imageUrl);
              
              // Log imageUrl for verification
              console.log("Image URL:", imageUrl);
          }
      }
  );

  // Event listener for the "Upload Photo" button
  document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
          myWidget.open();
      },
      false
  );

  // Event listener for the form submission to create a new post
  const newPostForm = document.querySelector('.new-post-form');
  newPostForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const title = document.getElementById('post-title').value;
      const content = document.getElementById('post-content').value;

      console.log("Title:", title);
      console.log("Content:", content);
      console.log("Image URL:", imageUrl);
      
      // Check if imageUrl is defined
      if (!imageUrl) {
          console.error("Error: Image URL is not defined.");
          return; // Exit early
      }

      // Construct the data to send to the server
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('photo', imageUrl);

      // Example of sending the data using fetch API
      fetch('/dashboard', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          // Handle response
          console.log('Server response:', response);
          // Clear the form fields after successful submission
          document.getElementById('post-title').value = '';
          document.getElementById('post-content').value = '';
          document.getElementById('uploadedimage').setAttribute('src', ''); // Clear uploaded image
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle error
      });
  });
});
