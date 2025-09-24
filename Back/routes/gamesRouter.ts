import express from "express";
import { startPractice, createGameSession, getSession, acceptGameSession, finishGameSession } from "../controllers/gameSessionController";
import { gameSessionValidationSchema } from "../utils/validationSchemas/gameSessionSchema";
import { validationHandler } from "../middlewares/validationHandler";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router({mergeParams:true});

router.get("/:gameType/practice", startPractice);
router.post("/:gameType", gameSessionValidationSchema, validationHandler, protectedRoute, createGameSession);
router.get("/:gameSessionId", protectedRoute, getSession);
router.post("/:gameSessionId/accept", protectedRoute, acceptGameSession);
router.post('/:gameSessionId/finish', protectedRoute, finishGameSession);

export default router;
