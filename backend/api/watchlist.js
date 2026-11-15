import express from "express";
const router = express.Router();
export default router;

import {
  createWatchlistItem,
  getWatchlistByUserId,
  getWatchlistItemById,
  updateWatchlistItemById,
  deleteWatchlistItemById,
} from "#db/queries/watchlist";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.get("/", async (req, res) => {
  const watchlist = await getWatchlistByUserId(req.user.id);
  res.send(watchlist);
});

router.post("/", requireBody(["movieId"]), async (req, res) => {
  const { movieId } = req.body;
  const item = await createWatchlistItem(req.user.id, movieId);
  res.status(201).send(item);
});

router.param("id", async (req, res, next, id) => {
  const item = await getWatchlistItemById(id);
  if (!item) return res.status(404).send("Watchlist item not found.");

  if (item.user_id !== req.user.id)
    return res.status(403).send("This is not your watchlist item.");

  req.item = item;
  next();
});

router.put("/:id", requireBody(["watched"]), async (req, res) => {
  const { watched } = req.body;
  const item = await updateWatchlistItemById(req.item.id, watched);
  res.send(item);
});

router.delete("/:id", async (req, res) => {
  await deleteWatchlistItemById(req.item.id);
  res.sendStatus(204);
});
