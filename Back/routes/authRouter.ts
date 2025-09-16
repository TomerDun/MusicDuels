import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { userValidationHandler, userValidationSchema } from "../middlewares/userValidation";

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', userValidationSchema, userValidationHandler, registerUser);

export default router;