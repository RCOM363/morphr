import type { DocumentMimeType, ImageMimeType } from "../constants/file.js";

export interface ConvertImageProps {
  image: Express.Multer.File | undefined;
  requiredFormat: ImageMimeType;
}

export interface ConvertDocumentProps {
  document: Express.Multer.File | undefined;
  requiredFormat: DocumentMimeType;
}
