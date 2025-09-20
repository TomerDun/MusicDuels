import express from "express";
import {getUserProfile, updateUserProfile, getUserStats} from "../controllers/usersController";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/profile/:id', protectedRoute, getUserProfile);
router.put('/profile/:id', updateUserProfile);

router.get('/stats/:id', getUserStats)

export default router;