import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMovie } from "../api/movies";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const syncMovie = async () => {
    const data = await getMovie(id);
    setMovie(data);
  };

  useEffect(() => {
    syncMovie();
  }, [id]);

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
    </>
  );
}
