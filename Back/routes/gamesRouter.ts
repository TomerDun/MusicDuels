import express from "express";
import { startPractice, startGameSession, getGameSession, acceptGameSession, finishGameSession } from "../controllers/gameSessionController";
import { gameSessionValidationSchema } from "../utils/validationSchemas/gameSessionSchema";
import { validationHandler } from "../middlewares/validationHandler";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router({mergeParams:true});

router.get("/session/:gameSessionId", protectedRoute, getGameSession);
router.post("/session/:gameSessionId/accept", protectedRoute, acceptGameSession);
router.post('/session/:gameSessionId/finish', protectedRoute, finishGameSession);
router.post("/:gameType", gameSessionValidationSchema, validationHandler, protectedRoute, startGameSession);
router.get("/:gameType/practice", startPractice);

export default router;
