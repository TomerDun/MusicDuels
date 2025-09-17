import express from "express";
import {getUserProfile, updateUserProfile, getUserStats} from "../controllers/usersController";

const router = express.Router();

router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', updateUserProfile);

router.get('/stats/:id', getUserStats)

export default router;