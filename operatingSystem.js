import os from "node:os";

export const getEOL = () => {
  const eol = os.EOL;
  console.log(`The operating system-specific end-of-line marker is: "${eol}"`);
};

export const getCPUsInfo = () => {
  const cpus = os.cpus();

  console.log(`Overall amount of CPUs: ${cpus.length}`);

  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Speed: ${cpu.speed / 1000} GHz`);
  });
};

export const getHomeDirectory = () => {
  const homeDir = os.homedir();
  console.log(`Home Directory: ${homeDir}`);
};

export const getCurrentUsername = () => {
  const username = os.userInfo().username;
  console.log(`Current System User Name: ${username}`);
};

export const getCPUBinary = () => {
  const cpuArchitecture = os.arch();
  console.log(`Node.js Binary CPU Architecture: ${cpuArchitecture}`);
};
