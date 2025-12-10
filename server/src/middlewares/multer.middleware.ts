import multer from "multer";
import type { FileFilterCallback, StorageEngine } from "multer";
import type { Request } from "express";

import { MIME_TYPES, type MimeType } from "../constants/file.js";
import { APIError } from "../utils/APIError.js";

const storage: StorageEngine = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  if (MIME_TYPES.includes(file.mimetype as MimeType)) {
    cb(null, true);
  } else {
    cb(
      new APIError(
        400,
        `File type not allowed: ${file.originalname} (${file.mimetype}`
      )
    );
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB
  },
});
