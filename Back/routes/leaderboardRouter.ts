import express from "express";
import { getGlobalLeaderboard } from "../controllers/leaderboardController";

const router = express.Router();

router.get('/', getGlobalLeaderboard); //limit and offset in query

export default router;