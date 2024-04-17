import multer from "multer"
import path from "path"
import httpError from "../helpers/HttpError.js";

const tempDir = path.resolve("tmp")

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(httpError(400, 'Please, upload images only.'));
    }
}

export const upload = multer({
    storage: multerConfig,
    fileFilter: multerFilter,
})
