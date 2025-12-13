import fs from "node:fs/promises";

/**
 * Helper func to remove uploaded files from the server
 * @param files
 */
export function removeFiles(files: Express.Multer.File[] | undefined) {
  if (!files) return;
  files.forEach((file) => {
    fs.unlink(file.path).catch((err) => {
      if (err) console.error(`Failed to remove ${file.path}`, err);
    });
  });
}
