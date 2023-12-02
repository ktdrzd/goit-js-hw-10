
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_xbvyr8gp6w59zaFxrYA5AC9mQDB1S6KCEnS5MTkN1v3jNF3sZJGG0d0ck0k6qDgX";


import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
const catDetails = document.getElementById("catDetails");

error.style.display = "none";

async function populateBreedsSelect() {
  try {
    loader.style.display = "block";
    const breeds = await fetchBreeds();
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading breeds:", err);
  } finally {
    loader.style.display = "none";
  }
}

populateBreedsSelect();

breedSelect.addEventListener("change", async (event) => {
  const selectedBreedId = event.target.value;
  try {
    loader.style.display = "block";
    error.style.display = "none";
    catInfo.style.display = "none";

    const catData = await fetchCatByBreed(selectedBreedId);
    const catImage = catData[0].url;
    const catBreed = catData[0].breeds[0];

    catDetails.innerHTML = `
      <img src="${catImage}" alt="Cat Image" />
      <p><strong>Breed:</strong> ${catBreed.name}</p>
      <p><strong>Description:</strong> ${catBreed.description}</p>
      <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
    `;

    catInfo.style.display = "block";
  } catch (err) {
    error.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
});