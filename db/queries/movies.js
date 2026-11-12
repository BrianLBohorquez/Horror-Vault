import db from "#db/client";

export async function createMovie(
  title,
  year,
  subgenreID,
  rating,
  review,
  liked,
  dateLogged,
) {
  const sql = `
  INSERT INTO movies
    (title, year, subgenre_id, rating, review, liked, date_logged)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;
  const {
    rows: [movies],
  } = await db.query(sql, [
    title,
    year,
    subgenreID,
    rating,
    review,
    liked,
    dateLogged,
  ]);
  return movies;
}
