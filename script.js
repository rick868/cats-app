const factInput = document.querySelector('.get-facts');
const photoInput = document.querySelector('.get-photos');
const factBtn = document.getElementById('submit-facts-btn');
const photoBtn = document.getElementById('submit-btn');
const factList = document.getElementById('display-facts');
const photoContainer = document.getElementById('display-photos');
const errorMsg = document.createElement('div'); 

errorMsg.className = 'error-message';
document.querySelector('.cats_app_display').prepend(errorMsg);

function showLoading(){
  loadingImage.style.display = 'block';
  factList.style.display = 'none';
  photoContainer.style.display = 'none';
  errorMsg.style.display = 'none';
  factList.innerHTML = '';
  photoContainer.innerHTML = '';
  errorMsg.textContent = '';
}
// Fetch cat facts
async function getCatFacts() {
  try {

    // Validate input
    let factCount = factInput.value;
    if (factCount > 50) factCount = 50;
    if (factCount < 1) factCount = 1;

    // Get facts from API
    const response = await axios.get(
      `https://meowfacts.herokuapp.com/?count=${factCount}`
    );
    
    // Display facts
    factList.innerHTML = '';
    response.data.data.forEach(fact => {
      factList.innerHTML += `<li> ${fact}</li>`;
    });
    
    // Hide error if successful
    errorMsg.style.display = 'none';
    
  } catch (error) {
    errorMsg.textContent = "Oops! Couldn't get cat facts. Try again later.";
    errorMsg.style.display = 'block';
    factList.innerHTML = '';
  }
}

// Fetch cat photos
async function getCatPhotos() {
  try {
    // Show loading and hide other content
    factList.style.display = 'none';
    photoContainer.style.display = 'grid'; // Using grid for better photo layout
    photoContainer.innerHTML = '<p>Loading cute cats...</p>';

    // Validate input
    let photoCount = photoInput.value;
    if (photoCount > 10) photoCount = 10;
    if (photoCount < 1) photoCount = 1;

    // Get photos from API
    const response = await axios.get(
      `https://meowfacts.herokuapp.com/?count=${photoCount}`
    );
    
    // Display photos
    photoContainer.innerHTML = '';
    response.data.forEach(cat => {
      const img = document.createElement('img');
      img.src = cat.url;
      img.className = 'cat-image';
      img.alt = 'Cute cat';
      photoContainer.appendChild(img);
    });
    
    // Hide error if successful
    errorMsg.style.display = 'none';
    
  } catch (error) {
    errorMsg.textContent = "Oops! Couldn't load cat photos. Try again later.";
    errorMsg.style.display = 'block';
    photoContainer.innerHTML = '';
  }
}

// Add event listeners
factBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getCatFacts();
});

photoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getCatPhotos();
});