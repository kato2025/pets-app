//Create variables
const img = document.getElementById('gifImage');
const fetchButton = document.getElementById('fetchButton');
const searchInput = document.getElementById('searchInput');
const loadingMessage = document.getElementById('loadingMessage');
const progressBar = document.getElementById('progress-bar');
const errorMessage = document.getElementById('error-message');
// Fetch a random image from the Giphy API
function fetchRandomImage(searchTerm = 'cats') {
  // Reset progress bar and hide loading message
  progressBar.style.width = '0%';
  loadingMessage.style.display = 'block';
  errorMessage.textContent = ''; // Clear any previous error messages
  // Fetch a random image from the Giphy API
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Nw1MDDpP2KNL4QMjNvjmM6nCj8AK7NpL&s=${searchTerm}`, { mode: 'cors' })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (response) {
      if (response.data && response.data.images && response.data.images.original.url) {
        const increment = 1; // Increment value for the progress bar in percentage
        const totalFrames = 100 / increment; // Total frames to reach 100%
        let currentFrame = 0; // Current frame

        const animationInterval = setInterval(() => {
          currentFrame += 1;
          progressBar.style.width = `${currentFrame * increment}%`;

          if (currentFrame >= totalFrames) {
            clearInterval(animationInterval); // Stop the progress bar animation
            img.src = response.data.images.original.url; // Set the image source
            errorMessage.textContent = ''; // Clear any previous error messages
            loadingMessage.style.display = 'none'; // Hide loading message when the pet image loads
          }
        }, 50); // Adjust the interval as needed (lower values make it faster)
      } else {
        displayError('No GIFs found for the given search term.');
      }
    })
    .catch(function (error) {
      displayError('Error fetching data. Please try again later.');
      console.error('Error fetching random image:', error);
    });
}
// Display an error message
function displayError(message) {
  errorMessage.textContent = message;
  img.src = 'default-error-image-url.jpg'; // Provide a default error image URL
  progressBar.style.width = '0%'; // Reset progress bar on error
  loadingMessage.style.display = 'none'; // Hide loading message on error
}
// Fetch a random image when the page loads
fetchRandomImage();
// Add event listener to the button to fetch new images
fetchButton.addEventListener('click', function () {
  const searchTerm = searchInput.value;
  fetchRandomImage(searchTerm);
});
// Handle search when Enter key is pressed
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value;
    fetchRandomImage(searchTerm);
  }
});
