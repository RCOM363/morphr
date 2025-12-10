import { APIError } from "../utils/APIError.js";
import type { ConvertDocumentProps, ConvertImageProps } from "./file.types.js";

class FileService {
  async convertImage(props: ConvertImageProps) {
    const { image, requiredFormat } = props;
    console.log(image);
    console.log(requiredFormat);
  }

  async convertDocument(props: ConvertDocumentProps) {
    const { document, requiredFormat } = props;
    console.log(document);
    console.log(requiredFormat);
  }
}

export default new FileService();
