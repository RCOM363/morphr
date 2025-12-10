import type { Request, Response } from "express";

import fileService from "./file.service.js";

class FileController {
  async convertImage(req: Request, res: Response) {
    const incomingImage = req.file;
    const body = req.body;

    const props = {
      image: incomingImage,
      requiredFormat: body.requiredFormat,
    };

    await fileService.convertImage(props);

    res.status(204).json();
  }

  async convertDocument(req: Request, res: Response) {
    const incomingDocument = req.file;
    const body = req.body;

    const props = {
      document: incomingDocument,
      requiredFormat: body.requiredFormat,
    };
    await fileService.convertDocument(props);
    res.status(204).json();
  }
}

export default new FileController();
