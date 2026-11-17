import db from "#db/client";

export async function createComment(userId, movieId, body) {
  const sql = `
  INSERT INTO comments
    (user_id, movie_id, body)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [comment],
  } = await db.query(sql, [userId, movieId, body]);
  return comment;
}

export async function getCommentsByMovieId(movieId) {
  const sql = `
  SELECT comments.*, users.username
  FROM
    comments
    JOIN users ON users.id = comments.user_id
  WHERE comments.movie_id = $1
  ORDER BY comments.id DESC
  `;
  const { rows: comments } = await db.query(sql, [movieId]);
  return comments;
}

export async function getCommentById(id) {
  const sql = `
  SELECT *
  FROM comments
  WHERE id = $1
  `;
  const {
    rows: [comment],
  } = await db.query(sql, [id]);
  return comment;
}

export async function deleteCommentById(id) {
  const sql = `
  DELETE FROM comments
  WHERE id = $1
  `;
  await db.query(sql, [id]);
}
