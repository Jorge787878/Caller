const fsExtra = require("fs-extra");
const linkOpts = require("./linker-config");
const cp = require("child_process");

/* Prepare */
fnLog = (code, msg) => console.log(`\x1b[3${code}m` + msg + "\x1b[0m");

const log = {
  fail: (msg) => fnLog(1, "X " + msg),
  success: (msg) => fnLog(2, "✔ " + msg),
  warning: (msg) => fnLog(3, "! " + msg),
  info: (msg) => fnLog(4, "ℹ " + msg),
};

const writePackage = (pathToWrite, newPackage) =>
  fsExtra.writeFileSync(pathToWrite, JSON.stringify(newPackage, null, 2));

const executeSync = (command) => cp.execSync(command, { stdio: "inherit" });

log.info("Preparing...");
for (const optName in linkOpts) {
  const optValue = linkOpts[optName];
  if (!optValue) {
    log.fail(optName + " is undefined");
    process.exit();
  }
}

log.info("Initializing...");
executeSync("cd " + linkOpts.pathToWork);

log.info("Unlinking...");
executeSync("npm unlink " + linkOpts.linkName);

log.info("Getting package");
const packageJsonOriginal = fsExtra.readJsonSync(linkOpts.pathPackageJson);
const packageJsonTemp = JSON.parse(JSON.stringify(packageJsonOriginal));

log.info("Deleting library dependecy");
delete packageJsonTemp.dependencies[linkOpts.libraryName];
writePackage(linkOpts.pathPackageJson, packageJsonTemp);

log.info("Installing package dependencies");
executeSync("npm install");

log.info("Restoring original package.json");
writePackage(linkOpts.pathPackageJson, packageJsonOriginal);

log.info("Going to path and link");
executeSync("cd " + linkOpts.folderContainerLibraryDistToLink);
executeSync("npm link");
executeSync("cd ../..");
executeSync("npm link " + linkOpts.linkName);

log.success("Link ended");
