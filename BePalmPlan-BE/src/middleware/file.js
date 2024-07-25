import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "BePalmPlan",
        allowedFormats: ["jpg", "png", "jpeg", "gif"]
    }
});

export const upload = multer({storage});