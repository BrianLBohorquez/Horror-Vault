import express from "express";
const router = express.Router();
export default router;

import {
  getMovies,
  getMovieById,
  getRecentMovies,
  getRandomMovies,
  getSimilarMovies,
} from "#db/queries/movies";
import { createComment, getCommentsByMovieId } from "#db/queries/comments";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.get("/", async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

router.get("/recent", async (req, res) => {
  const movies = await getRecentMovies();
  res.send(movies);
});

router.get("/random", async (req, res) => {
  const movies = await getRandomMovies();
  res.send(movies);
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

router.get("/:id/comments", async (req, res) => {
  const comments = await getCommentsByMovieId(req.movie.id);
  res.send(comments);
});

router.post(
  "/:id/comments",
  requireUser,
  requireBody(["body"]),
  async (req, res) => {
    const { body } = req.body;
    const comment = await createComment(req.user.id, req.movie.id, body);
    res.status(201).send(comment);
  },
);
