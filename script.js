import axios from "axios";

const catFactInput = document.getElementById("cat-fact-input");
const catPhotoInput = document.getElementById("cat-photo-input");
const catFactBtn = document.getElementById("cat-fact-btn");
const catPhotoBtn = document.getElementById("cat-photo-btn");
const factPhotoDisplay = document.getElementById("factPhotoDisplay");
const catFactList = document.getElementById("cat-list");
const imgContainer = document.getElementById("img-container");
const errorDisplay = document.getElementById("error");

async function fetchCatFacts() {
  try {
    imgContainer.classList.add("d-none");
    catFactList.classList.remove("d-none");
    catFactList.innerHTML = "";
    catFactList.innerHTML = `<div class="spinner"></div>`;
    const response = await axios.get(
      `https://meowfacts.herokuapp.com/?count=${catFactInput.value}`,
    );
    let { statusText, data } = response;
    if (statusText === "OK") {
      if (data.data.length > 0) {
        catFactList.innerHTML = "";
        data.data.forEach((fact) => {
          catFactList.innerHTML += `<li>${fact}</li>`;
        });
      } else {
        errorDisplay.classList.remove("error-display");
        errorDisplay.innerHTML = `No facts found`;
      }
    } else {
      errorDisplay.classList.remove("error-display");
    }
  } catch (error) {
    // console.warn(error.response.data);
    errorDisplay.classList.remove("error-display");
  }
}

async function fetchCatPhotos() {
  try {
    catFactList.classList.add("d-none");
    imgContainer.classList.remove("d-none");
    imgContainer.innerHTML = "";
    imgContainer.innerHTML = `<div class="spinner"></div>`;
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=${parseInt(catPhotoInput.value)}`,
    );
    let { status, data } = response;
    // console.log(data);
    if (status === 200) {
      if (data.length > 0) {
        imgContainer.innerHTML = "";
        data.forEach((photo) => {
          let { url, width, height } = photo;
          imgContainer.innerHTML += `
            <img src="${url}" class="img" alt="cat pic">
          `;
        });
      } else {
        errorDisplay.classList.remove("d-none");
        errorDisplay.innerHTML = `No cat photos found`;
      }
    } else {
      errorDisplay.classList.remove("d-none");
    }
  } catch (error) {
    // console.warn(error);
    errorDisplay.classList.remove("d-none");
  }
}

catFactBtn.addEventListener("click", fetchCatFacts);
catPhotoBtn.addEventListener("click", fetchCatPhotos);