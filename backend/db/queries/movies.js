import db from "#db/client";

export async function createMovie(
  title,
  year,
  posterUrl,
  subgenreId,
  rating,
  review,
  liked,
  dateLogged,
) {
  const sql = `
  INSERT INTO movies
    (title, year, poster_url, subgenre_id, rating, review, liked, date_logged)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
  `;
  const {
    rows: [movie],
  } = await db.query(sql, [
    title,
    year,
    posterUrl,
    subgenreId,
    rating,
    review,
    liked,
    dateLogged,
  ]);
  return movie;
}

export async function getMovies() {
  const sql = `
  SELECT movies.*, subgenres.name AS subgenre
  FROM
    movies
    JOIN subgenres ON subgenres.id = movies.subgenre_id
  ORDER BY title
  `;
  const { rows: movies } = await db.query(sql);
  return movies;
}

export async function getMovieById(id) {
  const sql = `
  SELECT movies.*, subgenres.name AS subgenre
  FROM
    movies
    JOIN subgenres ON subgenres.id = movies.subgenre_id
  WHERE movies.id = $1
  `;
  const {
    rows: [movie],
  } = await db.query(sql, [id]);
  return movie;
}

export async function getRecentMovies() {
  const sql = `
  SELECT movies.*, subgenres.name AS subgenre
  FROM
    movies
    JOIN subgenres ON subgenres.id = movies.subgenre_id
  ORDER BY date_logged DESC
  LIMIT 10
  `;
  const { rows: movies } = await db.query(sql);
  return movies;
}

export async function getRandomMovie() {
  const sql = `
  SELECT movies.*, subgenres.name AS subgenre
  FROM
    movies
    JOIN subgenres ON subgenres.id = movies.subgenre_id
  ORDER BY random()
  LIMIT 1
  `;
  const {
    rows: [movie],
  } = await db.query(sql);
  return movie;
}

export async function getSimilarMovies(subgenreId, movieId) {
  const sql = `
  SELECT movies.*, subgenres.name AS subgenre
  FROM
    movies
    JOIN subgenres ON subgenres.id = movies.subgenre_id
  WHERE movies.subgenre_id = $1
    AND movies.id <> $2
    AND movies.rating IS NOT NULL
  ORDER BY movies.liked DESC, movies.rating DESC
  LIMIT 6
  `;
  const { rows: movies } = await db.query(sql, [subgenreId, movieId]);
  return movies;
}
