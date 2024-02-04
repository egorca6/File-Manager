import { stdin, exit, cwd, argv } from "node:process";
import os from "node:os";
import path from "node:path";
import { listDirectory } from "./listDirectory.js";

export const initialize = () => {
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
    } else {
      console.log(`You are currently in, ${cwd()}!`);
      console.log(`Invalid input`);
    }
  });
};
