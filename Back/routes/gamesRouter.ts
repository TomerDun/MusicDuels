import express from "express";
import { startPractice, createSession, getSession, updateSession } from "../controllers/gamesController";
import { gameSessionValidationSchema } from "../utils/validationSchemas/gameSessionSchema";
import { validationHandler } from "../middlewares/validationHandler";

const router = express.Router({mergeParams:true});

router.get("/practice", startPractice);
router.post("/", gameSessionValidationSchema, validationHandler, createSession);
router.get("/:sessionId", getSession);
router.put("/:sessionId", gameSessionValidationSchema, validationHandler, updateSession);

export default router;
