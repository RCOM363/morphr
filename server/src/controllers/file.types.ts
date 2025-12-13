import type { DocumentExtention, ImageExtention } from "../constants/file.js";

export interface ConvertImageProps {
  image: Express.Multer.File | undefined;
  outputFormat: ImageExtention;
}

export interface ConvertImagesProps {
  images: Express.Multer.File[] | undefined;
  outputFormatMap: Record<string, ImageExtention>;
}

export interface ConvertDocumentProps {
  document: Express.Multer.File | undefined;
  outputFormat: DocumentExtention;
}
