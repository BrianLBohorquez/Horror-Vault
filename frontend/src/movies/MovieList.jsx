import { Link } from "react-router";

export default function MovieList({ movies }) {
  return (
    <ul className="flex flex-wrap gap-6">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}

function MovieListItem({ movie }) {
  return (
    <li>
      <Link to={"/movies/" + movie.id} title={movie.title}>
        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={"Poster of " + movie.title}
            loading="lazy"
          />
        ) : (
          <p>{movie.title}</p>
        )}
      </Link>
      <p>{movie.year}</p>
      <p>{movie.subgenre}</p>
      {movie.rating ? <p>Rating: {movie.rating}</p> : <p>Not rated</p>}
    </li>
  );
}
