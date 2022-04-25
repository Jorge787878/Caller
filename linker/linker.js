module.exports = function (optConfig) {
  const fsExtra = require("fs-extra");
  const cp = require("child_process");

  const pathPackageJson = optConfig.pathToWork + "/package.json";
  let packageJsonOriginal;
  let packageJsonTemp;

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

  const executeSync = (command) => cp.execSync(command, { stdio: "inherit" });

  log.info("Preparing " + optConfig.name);
  for (const optName in optConfig) {
    const optValue = optConfig[optName];
    if (!optValue) {
      log.fail(optName + " is not defined");
      process.exit();
    }
  }

  log.info("Initializing...");
  executeSync("cd " + optConfig.pathToWork);

  log.info("Unlinking...");
  executeSync("npm unlink " + optConfig.linkName);

  log.info("Getting package");
  packageJsonOriginal = fsExtra.readJsonSync(pathPackageJson);
  packageJsonTemp = JSON.parse(JSON.stringify(packageJsonOriginal));

  log.info("Deleting library dependecy");
  delete packageJsonTemp.dependencies[optConfig.libraryName];
  writePackage(pathPackageJson, packageJsonTemp);

  log.info("Installing package dependencies");
  executeSync("npm install");

  log.info("Restoring original package.json");
  writePackage(pathPackageJson, packageJsonOriginal);

  log.info("Going to path and link");
  executeSync(
    "cd " + optConfig.pathToWork + optConfig.folderContainerLibraryDistToLink
  );
  executeSync("npm link");
  executeSync("cd ../..");
  executeSync("npm link " + optConfig.linkName);

  log.success("Link ended");
};
