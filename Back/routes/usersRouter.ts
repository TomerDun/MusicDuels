import express from "express";
import {getUser, updateUser, getUserStats, getActiveUser} from "../controllers/usersController";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/active', protectedRoute, getActiveUser);
router.get('/profile/:id', protectedRoute, getUser);
router.put('/profile/:id', updateUser);

router.get('/stats/:id', getUserStats)

export default router;