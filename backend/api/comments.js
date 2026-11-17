import express from "express";
const router = express.Router();
export default router;

import { getCommentById, deleteCommentById } from "#db/queries/comments";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.param("id", async (req, res, next, id) => {
  const comment = await getCommentById(id);
  if (!comment) return res.status(404).send("Comment not found.");

  if (comment.user_id !== req.user.id)
    return res.status(403).send("This is not your comment.");

  req.comment = comment;
  next();
});

router.delete("/:id", async (req, res) => {
  await deleteCommentById(req.comment.id);
  res.sendStatus(204);
});
