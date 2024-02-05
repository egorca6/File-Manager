import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";

export const compressFile = (sourcePath, destinationPath) => {
  const sourceStream = fs.createReadStream(sourcePath, { encoding: "utf8" });

  const destinationPathWithExtension = path.extname(destinationPath)
    ? destinationPath
    : `${destinationPath}.br`;

  const destinationStream = fs.createWriteStream(destinationPathWithExtension);

  const brotliCompressor = zlib.createBrotliCompress();

  sourceStream.pipe(brotliCompressor).pipe(destinationStream);

  destinationStream.on("finish", () => {
    console.log(
      `File compressed from "${sourcePath}" to "${destinationPathWithExtension}"`
    );
  });

  destinationStream.on("error", (error) => {
    console.error(`Error compressing file: ${error.message}`);
  });
};

export const decompressFile = (sourcePath, destinationPath) => {
  const sourceStream = fs.createReadStream(sourcePath);

  const destinationPathWithExtension = path.extname(destinationPath)
    ? destinationPath
    : `${destinationPath}.decompressed`;

  const destinationStream = fs.createWriteStream(destinationPathWithExtension, {
    encoding: "utf8",
  });

  const brotliDecompressor = zlib.createBrotliDecompress();

  sourceStream.pipe(brotliDecompressor).pipe(destinationStream);

  destinationStream.on("finish", () => {
    console.log(
      `File decompressed from "${sourcePath}" to "${destinationPathWithExtension}"`
    );
  });

  destinationStream.on("error", (error) => {
    console.error(`Error decompressing file: ${error.message}`);
  });
};
