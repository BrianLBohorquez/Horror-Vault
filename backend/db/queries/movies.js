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
