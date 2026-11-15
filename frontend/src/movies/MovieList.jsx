import { Link } from "react-router";

export default function MovieList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}

function MovieListItem({ movie }) {
  return (
    <li>
      {movie.poster_url ? (
        <img
          src={movie.poster_url}
          alt={"Poster of " + movie.title}
          loading="lazy"
        />
      ) : (
        <p>No poster</p>
      )}
      <Link to={"/movies/" + movie.id}>{movie.title}</Link>
      <p>{movie.year}</p>
      <p>{movie.subgenre}</p>
    </li>
  );
}
