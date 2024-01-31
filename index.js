import { argv } from "node:process";

const parseArgs = () => {
  const args = argv.slice(2);
  const username = args.join().slice(11) || "Guest";

  console.log(`Welcome to the File Manager, ${username}!`);
};

parseArgs();
