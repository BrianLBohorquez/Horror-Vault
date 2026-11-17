import { useState, useEffect } from "react";
import { getRecentMovies, getRandomMovies } from "../api/movies";

import MovieList from "../movies/MovieList";

export default function HomePage() {
  const [recentMovies, setRecentMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);

  const syncRecentMovies = async () => {
    const data = await getRecentMovies();
    setRecentMovies(data);
  };

  const syncRandomMovies = async () => {
    const data = await getRandomMovies();
    setRandomMovies(data);
  };

  useEffect(() => {
    syncRecentMovies();
    syncRandomMovies();
  }, []);

  return (
    <>
      <h1>Brian&apos;s Recently Seen</h1>
      <MovieList movies={recentMovies} />
      <h2>Random Picks</h2>
      <MovieList movies={randomMovies} />
    </>
  );
}
