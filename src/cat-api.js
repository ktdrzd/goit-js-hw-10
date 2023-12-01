import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_xbvyr8gp6w59zaFxrYA5AC9mQDB1S6KCEnS5MTkN1v3jNF3sZJGG0d0ck0k6qDgX";

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}