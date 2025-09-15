import multer from "multer";
import path from "path";
import { v4 as uuid } from 'uuid';
import { ValidationError } from "./client-errors";
import fs from 'fs/promises';

const storage: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'assets/images'),
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        callback(null, uuid() + ext);
    }
});

type FilterCallback = {
    (error: ValidationError | null, acceptFile?: boolean)
}

const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: FilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype))
        callback(new ValidationError('Only jpg, jpeg, png are allowed'), false);
    callback(null, true); // if all clear continue:
}

export const validateUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

export async function deleteImage(imagePath: string) {
    try {
        const fileFullPath = path.join(__dirname, '../', imagePath);
        await fs.unlink(fileFullPath);
        console.log('File deleted successfully');
    } catch (error) {
        console.error('Error deleting file:', error);
    }
}
