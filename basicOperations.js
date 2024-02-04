import fs from "node:fs";
import path from "node:path";

export const catOperation = (filePath) => {
  const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });

  readableStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on("error", (error) => {
    console.error(`Invalid input: ${error.message}`);
  });
};

export const addOperation = (fileName, currentDir) => {
  const filePath = `${currentDir}/${fileName}`;

  try {
    fs.writeFileSync(filePath, "", "utf8");
    console.log(`File "${fileName}" created in ${currentDir}`);
  } catch (error) {
    console.error(`Error creating file: ${error.message}`);
  }
};

export const rnOperation = (sourcePath, targetFilename, currentDir) => {
  const targetPath = `${currentDir}/${targetFilename}`;

  try {
    fs.renameSync(sourcePath, targetPath);
    console.log(`File renamed from "${sourcePath}" to "${targetPath}"`);
  } catch (error) {
    console.error(`Error renaming file: ${error.message}`);
  }
};

export const cpOperation = (sourcePath, targetDirectory) => {
  try {
    const sourceFileName = path.basename(sourcePath);
    const targetPath = path.join(targetDirectory, sourceFileName);

    const readableStream = fs.createReadStream(sourcePath, {
      encoding: "utf8",
    });

    const writableStream = fs.createWriteStream(targetPath, {
      encoding: "utf8",
    });

    readableStream.pipe(writableStream);

    writableStream.on("finish", () => {
      console.log(`File copied from "${sourcePath}" to "${targetPath}"`);
    });

    writableStream.on("error", (error) => {
      console.error(`Error copying file: ${error.message}`);
    });
  } catch (error) {
    console.error(`Error copying file: ${error.message}`);
  }
};

export const rmOperation = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    console.log(`File "${filePath}" deleted`);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
  }
};

export const mvOperation = (sourcePath, targetDirectory) => {
  try {
    const sourceFileName = path.basename(sourcePath);
    const targetPath = path.join(targetDirectory, sourceFileName);

    const readableStream = fs.createReadStream(sourcePath, {
      encoding: "utf8",
    });

    const writableStream = fs.createWriteStream(targetPath, {
      encoding: "utf8",
    });

    readableStream.pipe(writableStream);

    writableStream.on("finish", () => {
      console.log(`File moved from "${sourcePath}" to "${targetPath}"`);
      try {
        fs.unlinkSync(sourcePath);
        console.log(`Original file "${sourcePath}" deleted`);
      } catch (deleteError) {
        console.error(`Error deleting original file: ${deleteError.message}`);
      }
    });

    writableStream.on("error", (error) => {
      console.error(`Error moving file: ${error.message}`);
    });
  } catch (error) {
    console.error(`Error moving file: ${error.message}`);
  }
};
