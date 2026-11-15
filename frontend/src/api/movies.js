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
