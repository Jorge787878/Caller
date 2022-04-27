module.exports = function (optConfig) {
  const fsExtra = require("fs-extra");
  const cp = require("child_process");

  const pathPackageJson = optConfig.pathToWork + "/package.json";
  let packageJsonOriginal;
  let packageJsonTemp;

  /* Prepare */
  const fnLog = (code, msg) =>
    console.log(`\x1b[3${code}m` + optConfig.name + " " + msg + "\x1b[0m");

  const log = {
    fail: (msg) => fnLog(1, "X " + msg),
    success: (msg) => fnLog(2, "✔ " + msg),
    warning: (msg) => fnLog(3, "! " + msg),
    info: (msg) => fnLog(4, "ℹ " + msg),
  };

  getPathBack = (pathRaw) => {
    const backPathList = pathRaw.split("/");
    backPathList.shift();
    return backPathList.map(() => "..").join("/");
  };

  const writePackage = (pathToWrite, newPackage) =>
    fsExtra.writeFileSync(pathToWrite, JSON.stringify(newPackage, null, 2));

  const executeSync = (command) =>
    cp.execSync(command, { stdio: "inherit", maxBuffer: Infinity });

  const sleep = (time) => {
    return new Promise((res) => {
      const timer = setTimeout(() => {
        res();
        clearTimeout(timer);
      }, time);
    });
  };

  log.info("Preparing " + optConfig.name);
  for (const optName in optConfig) {
    const optValue = optConfig[optName];
    if (!optValue) {
      log.fail(optName + " is not defined");
    }
  }

  /* ===================================================================
    INIT
  =================================================================== */
  
  sleep(500).then(() => {
    log.info("Initializing...");
    executeSync("cd " + optConfig.pathToWork);

    log.info("Unlinking...");
    executeSync("npm unlink " + optConfig.linkName);

    log.info("Getting package");
    packageJsonOriginal = fsExtra.readJsonSync(pathPackageJson);
    packageJsonTemp = JSON.parse(JSON.stringify(packageJsonOriginal));

    log.info("Deleting library dependecy");
    if (!packageJsonTemp.dependencies?.[optConfig.libraryName]) {
      log.fail(
        optConfig.libraryName + " not exist in dependencies of package.json"
      );
    }
    delete packageJsonTemp.dependencies[optConfig.libraryName];
    writePackage(pathPackageJson, packageJsonTemp);

    log.warning("before install " + process.cwd());
    log.info("Installing package dependencies");
    process.chdir(optConfig.pathToWork);
    executeSync("npm install");
    log.warning("after install " + process.cwd());

    /* ===================================================================
      POST INSTALL
    */
    sleep(100).then(() => {
      log.info("Restoring original package.json");
      writePackage(pathPackageJson, packageJsonOriginal);

      log.info("Going to path and link");

      process.chdir(
        optConfig.pathToWork + optConfig.folderContainerLibraryDistToLink
      );
      executeSync("npm link");

      process.chdir(optConfig.pathToWork);
      log.warning("before " + process.cwd());
      executeSync("npm link " + optConfig.linkName);
      log.warning("after " + process.cwd() + "npm link " + optConfig.linkName);

      log.success("Link ended");
    });
  });
};
