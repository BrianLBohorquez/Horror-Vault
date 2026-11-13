import db from "#db/client";
import { createMovie } from "#db/queries/movies";
import { createSubgenre } from "#db/queries/subgenres";
import { createUser } from "#db/queries/users";
import { parse } from "csv-parse/sync";
import fs from "fs";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await createUser("foo", "bar");

  const csv = fs.readFileSync("db/horror_movies.csv", "utf8");
  const movies = parse(csv, { columns: true });

  const subgenreIds = {};
  for (const movie of movies) {
    if (!subgenreIds[movie.subgenre]) {
      const subgenre = await createSubgenre(movie.subgenre);
      subgenreIds[movie.subgenre] = subgenre.id;
    }

    const posterUrl = await getPosterUrl(movie.title, movie.year);
    await createMovie(
      movie.title,
      movie.year,
      posterUrl,
      subgenreIds[movie.subgenre],
      movie.my_rating || null,
      movie.my_review || null,
      movie.liked === "yes",
      movie.date_logged,
    );
  }
}

async function getPosterUrl(title, year) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&year=${year}`,
    { headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` } },
  );
  const result = await response.json();
  if (!response.ok) throw Error(result.status_message);

  const match = result.results[0];
  if (!match || !match.poster_path) return null;
  return "https://image.tmdb.org/t/p/w500" + match.poster_path;
}
