const API = import.meta.env.VITE_API;

export async function getMovies() {
  try {
    const response = await fetch(API + "/movies");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getMovie(id) {
  try {
    const response = await fetch(API + "/movies/" + id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getSimilarMovies(id) {
  try {
    const response = await fetch(API + "/movies/" + id + "/similar");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getRecentMovies() {
  try {
    const response = await fetch(API + "/movies/recent");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getRandomMovies() {
  try {
    const response = await fetch(API + "/movies/random");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}
