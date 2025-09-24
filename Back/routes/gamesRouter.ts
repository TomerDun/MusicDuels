import express from "express";
import { startPractice, createGameSession, getSession, acceptGameSession, finishGameSession } from "../controllers/gameSessionController";
import { gameSessionValidationSchema } from "../utils/validationSchemas/gameSessionSchema";
import { validationHandler } from "../middlewares/validationHandler";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router({mergeParams:true});

router.get("/session/:gameSessionId", protectedRoute, getSession);
router.post("/session/:gameSessionId/accept", protectedRoute, acceptGameSession);
router.post('/session/:gameSessionId/finish', protectedRoute, finishGameSession);
router.post("/:gameType", gameSessionValidationSchema, validationHandler, protectedRoute, createGameSession);
router.get("/:gameType/practice", startPractice);

export default router;
