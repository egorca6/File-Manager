import { argv } from "node:process";

import { stdin, exit } from "node:process";

export const initialize = () => {
  const args = argv.slice(2);
  const username = args.join().slice(11) || "Guest";

  console.log(`Welcome to the File Manager, ${username}!`);

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
  });
};
