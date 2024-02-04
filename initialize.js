import { stdin, exit, cwd, argv } from "node:process";
import os from "node:os";
import path from "node:path";

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
    }
    if (input === "up") {
      const currentDir = cwd();
      const parentDir = path.resolve(currentDir, "..");
      process.chdir(parentDir);
      console.log(`You are now in, ${cwd()}!`);
    } else {
      console.log(`You are currently in, ${cwd()}!`);
    }
  });
};
