import express from "express";
const router = express.Router();
export default router;

import { getSubgenres } from "#db/queries/subgenres";

router.get("/", async (req, res) => {
  const subgenres = await getSubgenres();
  res.send(subgenres);
});
