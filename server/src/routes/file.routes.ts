import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import { upload } from "../middlewares/multer.middleware.js";
import fileController from "../controllers/file.controller.js";

const router = Router();

router
  .route("/convert-image")
  .post(
    upload.single("image"),
    expressAsyncHandler(fileController.convertImage)
  );

router
  .route("/convert-images")
  .post(
    upload.array("images"),
    expressAsyncHandler(fileController.convertImages)
  );

router
  .route("/convert-document")
  .post(
    upload.single("document"),
    expressAsyncHandler(fileController.convertDocument)
  );

export default router;
