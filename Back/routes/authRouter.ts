import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { userValidationSchema } from "../utils/validationSchemas/userSchema";
import { validationHandler } from "../middlewares/validationHandler";
import { fileUpload } from "../middlewares/fileUpload";

const router = express.Router();

router.post('/login', loginUser);
router.post('/register',
    fileUpload.single('profileImageFile'),
    userValidationSchema, validationHandler, registerUser);

export default router;