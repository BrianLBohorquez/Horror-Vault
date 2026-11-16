import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getMovie, getSimilarMovies } from "../api/movies";
import { addToWatchlist } from "../api/watchlist";
import { useAuth } from "../auth/AuthContext";

import MovieList from "./MovieList";

export default function MovieDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  const syncMovie = async () => {
    const data = await getMovie(id);
    setMovie(data);
  };

  const syncSimilarMovies = async () => {
    const data = await getSimilarMovies(id);
    setSimilarMovies(data);
  };

  useEffect(() => {
    syncMovie();
    syncSimilarMovies();
    setAdded(false);
    setError(null);
  }, [id]);

  const tryAdd = async () => {
    setError(null);

    try {
      await addToWatchlist(token, movie.id);
      setAdded(true);
    } catch (e) {
      setError(e.message);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      {movie.poster_url ? (
        <img src={movie.poster_url} alt={"Poster of " + movie.title} />
      ) : (
        <p>No poster</p>
      )}
      <h1>{movie.title}</h1>
      <p>{movie.year}</p>
      <p>{movie.subgenre}</p>
      {movie.rating ? <p>Rating: {movie.rating}</p> : <p>Not rated</p>}
      {movie.liked && <p>Liked</p>}
      <p>Logged {new Date(movie.date_logged).toLocaleDateString()}</p>
      {movie.review && <p>{movie.review}</p>}
      {token && (
        <button onClick={tryAdd} disabled={added}>
          {added ? "Added to watchlist" : "Add to watchlist"}
        </button>
      )}
      {error && <p role="alert">{error}</p>}
      <h2>More like this</h2>
      <MovieList movies={similarMovies} />
      <Link to={"/movies?subgenre=" + encodeURIComponent(movie.subgenre)}>
        See more {movie.subgenre}
      </Link>
    </>
  );
}
