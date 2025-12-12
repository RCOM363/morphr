import sharp from "sharp";

import { APIError } from "../utils/APIError.js";
import type { ConvertDocumentProps, ConvertImageProps } from "./file.types.js";

class FileService {
  async convertImage(props: ConvertImageProps) {
    const { image, outputFormat } = props;

    if (!image || !outputFormat) {
      throw new APIError(400, "Both file and output format are required!");
    }

    const imageTransformer = sharp(image.path).toFormat(outputFormat);

    if (!imageTransformer) {
      throw new APIError(
        500,
        `Error converting ${image.filename} to ${outputFormat}`
      );
    }

    const mimeType = `image/${outputFormat}`;

    return {
      mimeType,
      imageTransformer,
    };
  }

  async convertDocument(props: ConvertDocumentProps) {
    const { document, outputFormat } = props;
    console.log(document);
    console.log(outputFormat);
  }
}

export default new FileService();
