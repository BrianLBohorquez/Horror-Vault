import db from "#db/client";

export async function createSubgenre(name) {
  const sql = `
  INSERT INTO subgenres
    (name)
  VALUES
    ($1)
  RETURNING *
  `;
  const {
    rows: [subgenre],
  } = await db.query(sql, [name]);
  return subgenre;
}
