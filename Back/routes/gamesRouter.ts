import express from "express";
import { startPractice, createGameSession, getSession, updateSession } from "../controllers/gameSessionController";
import { gameSessionValidationSchema } from "../utils/validationSchemas/gameSessionSchema";
import { validationHandler } from "../middlewares/validationHandler";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router({mergeParams:true});

router.get("/practice", startPractice);
router.post("/", gameSessionValidationSchema, validationHandler, protectedRoute, createGameSession);
router.get("/:sessionId", getSession);
router.put("/:sessionId", gameSessionValidationSchema, validationHandler, updateSession);

export default router;
