import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { userValidationSchema } from "../utils/validationSchemas/userSchema";
import { validationHandler } from "../middlewares/validationHandler";

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', userValidationSchema, validationHandler, registerUser);

export default router;