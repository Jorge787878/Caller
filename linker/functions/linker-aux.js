const fsExtra = require("fs-extra");
const cp = require("child_process");
const process = require("process");

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

function createLink(active, name, path) {
  return {
    name,
    active,
    pathToWork: path + "/" + name,
    folderContainerLibraryDistToLink: "/ilsa-apps/ilsa-library",
    linkName: "@ilsa/library",
    libraryName: "@ilsa/library",
    install: true,
    libraryLinkCreate: true,
    libraryForceUpdate: false,
  };
}

function discardChangesInPackage(pathToWork) {
  console.log("Executing cleanup");
  process.chdir(pathToWork);
  executeSync("git checkout package.json");
  executeSync("git checkout package-lock.json");
}

function getCommandParams() {
  const params = {};

  let myArgs = process.argv.slice(2);
  myArgs.forEach((slug) => {
    const partials = slug.split("=");
    params[partials[0]] = partials[1];
  });

  return params;
}

function getCurrentBranchName() {
  return new Promise((resolve) => {
    cp.exec("git rev-parse --abbrev-ref HEAD", (error, stdout) => {
      resolve(stdout.trim());
    });
  });
}

module.exports = {
  fnLog,
  log,
  createLink,
  writePackage,
  discardChangesInPackage,
  getCurrentBranchName,
  executeSync,
  getCommandParams,
};
