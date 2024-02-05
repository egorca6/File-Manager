import { readdirSync, statSync } from "node:fs";
import { cwd } from "node:process";
import path from "node:path";

export const listDirectory = () => {
  const currentDir = cwd();

  try {
    const content = readdirSync(currentDir).sort();
    const folders = content.filter((item) =>
      statSync(path.join(currentDir, item)).isDirectory()
    );
    const files = content.filter((item) => !folders.includes(item));

    console.log("List of files and folders in the current directory:");
    console.log("Type\tName");
    folders.forEach((folder) => {
      console.log("Folder\t" + folder);
    });
    files.forEach((file) => {
      console.log("File\t" + file);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
