import multer from "multer";
import { ValidationError } from "../utils/client-errors";

type FilterCallback = {
    (error: ValidationError | null, acceptFile?: boolean)
}

export const fileUpload = multer({
    // check option to save images in memory instead of public folder (need changes in controller as well)
    // storage: multer.memoryStorage(), // Store in memory instead of disk
    dest: "public/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req: Express.Request, file: Express.Multer.File, callback: FilterCallback) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.mimetype))
            callback(new ValidationError("Only .jpg, .jpeg, and .png files are allowed!"), false);
        callback(null, true); // success
    }
});