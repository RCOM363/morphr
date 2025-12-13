import type { Request, Response } from "express";
import fs from "node:fs/promises";

import fileService from "./file.service.js";
import { APIError } from "../utils/APIError.js";
import { removeFiles } from "../utils/removeFiles.js";

class FileController {
  async convertImage(req: Request, res: Response) {
    const image = req.file;
    const outputFormat = req.body.outputFormat;

    /* ---- Get image stream & required info ---- */
    const { mimeType, imageName, imageStream } = await fileService.convertImage(
      {
        image,
        outputFormat,
      }
    );

    /* ----- Set content headers ----- */
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${imageName}"`);

    /* ----- Stream the image through pipe ----- */
    imageStream.pipe(res);

    /* ----- Handle errors ----- */
    imageStream.on("error", (err) => {
      console.error("Sharp stream error: ", err);
      if (!res.headersSent) {
        fs.unlink(image?.path!).catch(() => {}); // Cleanup
        removeFiles([image] as Express.Multer.File[]);
        throw new APIError(500, "Sharp stream error");
      }
    });

    /* ----- Cleanup after response finishes ----- */
    res.on("finish", () => removeFiles([image] as Express.Multer.File[]));
  }

  async convertImages(req: Request, res: Response) {
    const images = req.files as Express.Multer.File[] | undefined;
    const outputFormatMap = JSON.parse(req.body.outputFormatMap);

    /* ---- Get file stream & required info ---- */
    const { mimeType, fileName, fileStream } = await fileService.convertImages({
      images,
      outputFormatMap,
    });

    /* ----- Set content headers ----- */
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    /* ----- Stream the file through pipe ----- */
    fileStream.pipe(res);

    /* ----- Handle errors ----- */
    fileStream.on("error", (err) => {
      console.error("Sharp stream error: ", err);
      if (!res.headersSent) {
        removeFiles(images);
        throw new APIError(500, "Sharp stream error"); // Cleanup
      }
    });

    /* ----- Cleanup after response finishes ----- */
    res.on("finish", () => removeFiles(images));
  }

  async convertDocument(req: Request, res: Response) {
    const incomingDocument = req.file;
    const body = req.body;

    const props = {
      document: incomingDocument,
      outputFormat: body.outputFormat,
    };
    await fileService.convertDocument(props);
    res.status(204).json();
  }
}

export default new FileController();
