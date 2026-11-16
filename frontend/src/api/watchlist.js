const API = import.meta.env.VITE_API;

export async function getWatchlist(token) {
  try {
    const response = await fetch(API + "/watchlist", {
      headers: { Authorization: "Bearer " + token },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function addToWatchlist(token, movieId) {
  if (!token) {
    throw Error("You must be logged in to update your watchlist.");
  }

  const response = await fetch(API + "/watchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ movieId }),
  });

  if (!response.ok) {
    const result = await response.text();
    throw Error(result);
  }
}

export async function updateWatchlistItem(token, id, watched) {
  if (!token) {
    throw Error("You must be logged in to update your watchlist.");
  }

  const response = await fetch(API + "/watchlist/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ watched }),
  });

  if (!response.ok) {
    const result = await response.text();
    throw Error(result);
  }
}

export async function removeFromWatchlist(token, id) {
  if (!token) {
    throw Error("You must be logged in to update your watchlist.");
  }

  const response = await fetch(API + "/watchlist/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.text();
    throw Error(result);
  }
}
