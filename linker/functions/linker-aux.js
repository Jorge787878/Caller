const fsExtra = require("fs-extra");
const cp = require("child_process");

/* Prepare */
const fnLog = (code, msg) => console.log(`\x1b[3${code}m` + msg + "\x1b[0m");

const log = {
  fail: (msg) => fnLog(1, "X " + msg),
  success: (msg) => fnLog(2, "✔ " + msg),
  warning: (msg) => fnLog(3, "! " + msg),
  info: (msg) => fnLog(4, "ℹ " + msg),
};

const writePackage = (pathToWrite, newPackage) =>
  fsExtra.writeFileSync(pathToWrite, JSON.stringify(newPackage, null, 2));

const executeSync = (command) =>
  cp.execSync(command, { stdio: "inherit", maxBuffer: Infinity });

module.exports = {
  fnLog,
  log,
  writePackage,
  executeSync,
};
