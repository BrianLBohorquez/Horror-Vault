import { useState, useEffect } from "react";
import { getMovies } from "../api/movies";
import { getSubgenres } from "../api/subgenres";

import MovieList from "./MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [subgenres, setSubgenres] = useState([]);
  const [search, setSearch] = useState("");
  const [subgenre, setSubgenre] = useState("");

  const syncMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const syncSubgenres = async () => {
    const data = await getSubgenres();
    setSubgenres(data);
  };

  useEffect(() => {
    syncMovies();
    syncSubgenres();
  }, []);

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (subgenre === "" || movie.subgenre === subgenre),
  );

  return (
    <>
      <h1>Movies</h1>
      <label>
        Search
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <label>
        Subgenre
        <select value={subgenre} onChange={(e) => setSubgenre(e.target.value)}>
          <option value="">All</option>
          {subgenres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>
      <p>{filteredMovies.length} movies</p>
      <MovieList movies={filteredMovies} />
    </>
  );
}
