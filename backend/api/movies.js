import express from "express";
const router = express.Router();
export default router;

import {
  getMovies,
  getMovieById,
  getRecentMovies,
  getRandomMovie,
  getSimilarMovies,
} from "#db/queries/movies";

router.get("/", async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

router.get("/recent", async (req, res) => {
  const movies = await getRecentMovies();
  res.send(movies);
});

router.get("/random", async (req, res) => {
  const movie = await getRandomMovie();
  res.send(movie);
});

router.param("id", async (req, res, next, id) => {
  const movie = await getMovieById(id);
  if (!movie) return res.status(404).send("Movie not found.");
  req.movie = movie;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.movie);
});

router.get("/:id/similar", async (req, res) => {
  const movies = await getSimilarMovies(req.movie.subgenre_id, req.movie.id);
  res.send(movies);
});
