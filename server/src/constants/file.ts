/* ----- Supported mime types & their extentions ----- */

export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/aviff",
  "image/tiff",
  "image/heif",
] as const;

export const IMAGE_EXTENSTIONS = [
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
  "tiff",
  "heif",
] as const;

export const DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "application/rtf",
  "text/csv",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/epub+zip",

  // Archives
  "application/zip",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/x-bzip",
  "application/x-bzip2",
] as const;

export const DOCUMENT_EXTENSTIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "rtf",
  "csv",
  "epub",

  // OpenDocument formats
  "odt",
  "ods",
  "odp",
] as const;

export const MIME_TYPES = [
  ...IMAGE_MIME_TYPES,
  ...DOCUMENT_MIME_TYPES,
] as const;

export type ImageMimeType = (typeof IMAGE_MIME_TYPES)[number];
export type ImageExtention = (typeof IMAGE_EXTENSTIONS)[number];

export type DocumentMimeType = (typeof DOCUMENT_MIME_TYPES)[number];
export type DocumentExtention = (typeof DOCUMENT_EXTENSTIONS)[number];

export type MimeType = (typeof MIME_TYPES)[number];
