import express from "express";
import { startPractice, createSession, getSession, updateSession } from "../controllers/gamesController";

const router = express.Router({mergeParams:true});

router.get("/practice", startPractice);
router.post("/", createSession);
router.get("/:sessionId", getSession);
router.put("/:sessionId", updateSession);

export default router;
