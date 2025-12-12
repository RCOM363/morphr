import type { Request, Response } from "express";
import fs from "node:fs/promises";

import fileService from "./file.service.js";
import { APIError } from "../utils/APIError.js";

class FileController {
  async convertImage(req: Request, res: Response) {
    const incomingImage = req.file;
    const body = req.body;

    const props = {
      image: incomingImage,
      outputFormat: body.outputFormat,
    };

    /* ---- Get transformer ---- */
    const { mimeType, imageTransformer } = await fileService.convertImage(
      props
    );

    /* ----- Output image name ----- */
    const imageName = `${incomingImage?.filename.split(".")[0]}.${
      body.outputFormat
    }`;

    /* ----- Set content headers ----- */
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${imageName}"`);

    /* ----- Stream the image through pipe ----- */
    imageTransformer.pipe(res);

    /* ----- Handle errors ----- */
    imageTransformer.on("error", (err) => {
      console.error("Sharp stream error: ", err);
      if (!res.headersSent) {
        throw new APIError(500, "Sharp stream error");
      }
      fs.unlink(incomingImage?.path!).catch(() => {}); // Cleanup
    });

    /* ----- Cleanup after response finishes ----- */
    res.on("finish", () => fs.unlink(incomingImage?.path!).catch(() => {}));
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
