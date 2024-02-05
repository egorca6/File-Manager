import { stdin, exit, cwd, argv } from "node:process";
import os from "node:os";
import path from "node:path";
import { listDirectory } from "./listDirectory.js";
import {
  catOperation,
  addOperation,
  rnOperation,
  cpOperation,
  rmOperation,
  mvOperation,
} from "./basicOperations.js";
import {
  getEOL,
  getCPUsInfo,
  getHomeDirectory,
  getCurrentUsername,
  getCPUBinary,
} from "./operatingSystem.js";
import { compressFile, decompressFile } from "./compression.js";

export const initialize = () => {
  stdin.removeAllListeners("data");
  const args = argv.slice(2);
  const username = args.join().slice(11) || "Guest";

  console.log(`Welcome to the File Manager, ${username}!`);
  process.chdir(os.homedir());

  console.log(`You are currently in, ${cwd()}!`);
  process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    exit();
  });

  stdin.on("data", (data) => {
    const input = data.toString().trim();

    if (input === ".exit") {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      exit();
    } else if (input === "up") {
      const currentDir = cwd();
      const parentDir = path.resolve(currentDir, "..");
      process.chdir(parentDir);
      console.log(`You are now in, ${cwd()}!`);
    } else if (input.startsWith("cd ")) {
      const targetDir = input.slice(3).trim();
      const currentDir = cwd();

      try {
        const absolutePath = path.resolve(currentDir, targetDir);
        process.chdir(absolutePath);
        console.log(`You are now in, ${cwd()}!`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    } else if (input === "ls") {
      listDirectory();
    } else if (input.startsWith("cat ")) {
      const filePath = input.slice(4);
      catOperation(filePath);
    } else if (input.startsWith("add ")) {
      const fileName = input.slice(4).trim();
      addOperation(fileName, cwd());
    } else if (input.startsWith("rn ")) {
      const args = input.slice(3).trim().split(" ");
      if (args.length !== 2) {
        console.error(
          "Invalid input: Provide source file path and target filename"
        );
        return;
      }
      const sourcePath = args[0];
      const targetFilename = args[1];
      rnOperation(sourcePath, targetFilename, cwd());
    } else if (input.startsWith("cp ")) {
      const args = input.slice(3).trim().split(" ");
      if (args.length !== 2) {
        console.error(
          "Invalid input: Provide source file path and target directory path"
        );
        return;
      }
      const sourcePath = args[0];
      const targetDirectory = args[1];
      cpOperation(sourcePath, targetDirectory);
    } else if (input.startsWith("rm ")) {
      const filePath = input.slice(3).trim();
      rmOperation(filePath);
    } else if (input.startsWith("mv ")) {
      const args = input.slice(3).trim().split(" ");
      if (args.length !== 2) {
        console.error(
          "Invalid input: Provide source file path and target directory path"
        );
        return;
      }
      const sourcePath = args[0];
      const targetDirectory = args[1];
      mvOperation(sourcePath, targetDirectory);
    } else if (input === "os --EOL") {
      getEOL();
    } else if (input === "os --cpus") {
      getCPUsInfo();
    } else if (input === "os --homedir") {
      getHomeDirectory();
    } else if (input === "os --username") {
      getCurrentUsername();
    } else if (input === "os --architecture") {
      getCPUBinary();
    } else if (input.startsWith("compress ")) {
      const args = input.slice(9).trim().split(" ");
      if (args.length !== 2) {
        console.error(
          "Invalid input: Provide source file path and destination file path"
        );
        return;
      }
      const sourcePath = args[0];
      const destinationPath = args[1];
      compressFile(sourcePath, destinationPath);
    } else if (input.startsWith("decompress ")) {
      const args = input.slice(11).trim().split(" ");
      if (args.length !== 2) {
        console.error(
          "Invalid input: Provide source file path and destination file path"
        );
        return;
      }
      const sourcePath = args[0];
      const destinationPath = args[1];
      decompressFile(sourcePath, destinationPath);
    } else {
      console.log(`Invalid input: ${input}`);
      console.log(`You are currently in, ${cwd()}`);
    }
  });
};
