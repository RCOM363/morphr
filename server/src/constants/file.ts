export const MIME_TYPES = [
  // Images
  "image/x-citrix-jpeg",
  "image/x-png",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/webp",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.adobe.photoshop",

  // Documents / text
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

export type MimeType = (typeof MIME_TYPES)[number];
