const API = import.meta.env.VITE_API;

export async function getSubgenres() {
  try {
    const response = await fetch(API + "/subgenres");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}
