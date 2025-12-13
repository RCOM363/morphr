import sharp from "sharp";
import archiver from "archiver";

import { APIError } from "../utils/APIError.js";
import type {
  ConvertDocumentProps,
  ConvertImageProps,
  ConvertImagesProps,
} from "./file.types.js";

class FileService {
  async convertImage(props: ConvertImageProps) {
    const { image, outputFormat } = props;

    if (!image || !outputFormat) {
      throw new APIError(400, "Both file and output format are required!");
    }

    const imageStream = sharp(image.path).toFormat(outputFormat);

    if (!imageStream) {
      throw new APIError(
        500,
        `Error converting ${image.filename} to ${outputFormat}`
      );
    }

    const mimeType = `image/${outputFormat}`;
    const imageName = `${image.filename.split(".")[0]}.${outputFormat}`;

    return {
      mimeType,
      imageName,
      imageStream,
    };
  }

  async convertImages(props: ConvertImagesProps) {
    const { images, outputFormatMap } = props;

    if (!images || images.length === 0 || !outputFormatMap) {
      throw new APIError(400, "Images and output formats are required!");
    }

    if (images.length === 1) {
      const outputFormat = outputFormatMap[images[0]?.filename!];
      if (!outputFormat) throw new APIError(400, "No output format!");

      const { mimeType, imageName, imageStream } = await this.convertImage({
        image: images[0],
        outputFormat,
      });

      return {
        mimeType,
        fileName: imageName,
        fileStream: imageStream,
      };
    }

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    for (const image of images) {
      const outputFormat = outputFormatMap[image?.filename];
      if (!outputFormat) throw new APIError(400, "No output format!");

      const { imageName, imageStream } = await this.convertImage({
        image,
        outputFormat,
      });

      archive.append(imageStream, { name: imageName });
    }

    archive.finalize();

    return {
      mimeType: "application/zip",
      fileName: `converted_images_${Date.now()}.zip`,
      fileStream: archive,
    };
  }

  async convertDocument(props: ConvertDocumentProps) {
    const { document, outputFormat } = props;
    console.log(document);
    console.log(outputFormat);
  }
}

export default new FileService();
