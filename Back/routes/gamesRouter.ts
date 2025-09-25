import express from "express";
import { startPractice, startGameSession, getGameSession, acceptGameSession, finishGameSession, declineGameSession, deleteGameSession, getActiveUserCompletedGameSessions } from "../controllers/gameSessionController";
import { gameSessionValidationSchema } from "../utils/validationSchemas/gameSessionSchema";
import { validationHandler } from "../middlewares/validationHandler";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router({mergeParams:true});

router.get("/session/active", protectedRoute, getActiveUserCompletedGameSessions);
router.get("/session/:gameSessionId", protectedRoute, getGameSession);
router.patch("/session/:gameSessionId/accept", protectedRoute, acceptGameSession);
router.patch("/session/:gameSessionId/decline", protectedRoute, declineGameSession);
router.patch('/session/:gameSessionId/finish', protectedRoute, finishGameSession);
router.delete('/session/:gameSessionId/:gameSessionId', protectedRoute, deleteGameSession);
router.post("/:gameType", gameSessionValidationSchema, validationHandler, protectedRoute, startGameSession);
router.get("/:gameType/practice", startPractice);

export default router;
