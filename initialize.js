import { stdin, exit, cwd, argv } from "node:process";
import * as os from "node:os";

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
    console.log(`You are currently in, ${cwd()}!`);
    if (input === ".exit") {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      exit();
    }
  });
};
