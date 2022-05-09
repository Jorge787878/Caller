module.exports = function (microfrontend, microOpts) {
  const fsExtra = require("fs-extra");
  const fns = require("./functions/index.js");

  const pathPackageJson = microfrontend.pathToWork + "/package.json";
  let packageJsonOriginal;
  let packageJsonTemp;
  let pathAppsWithDist;

  /* ===================================================================
    Prepare
  =================================================================== */

  fns.aux.log.info("Preparing " + microfrontend.name);
  for (const optName in microfrontend) {
    const optValue = microfrontend[optName];
    if (!optValue) {
      fns.aux.log.fail(optName + " is not defined");
    }
  }

  fns.aux.log.info(microfrontend.name + " " + "Preparing...");

  /** Cleanup: if the process fail then the last microfrontend clean his own package changes */
  process.on("exit", () =>
    fns.aux.discardChangesInPackage(microfrontend.pathToWork)
  );

  /* ===================================================================
    Moving dist
  =================================================================== */

  pathAppsWithDist =
    microfrontend.pathToWork + microfrontend.folderContainerLibraryDistToLink;
  if (
    microOpts.forAllMicrofrontends.libraryForceUpdate ||
    microfrontend.libraryForceUpdate ||
    !fsExtra.existsSync(pathAppsWithDist)
  ) {
    fns.aux.log.warning(
      microfrontend.name + " " + pathAppsWithDist + " not exist, creating..."
    );
    fsExtra.emptyDirSync(pathAppsWithDist);
    fns.aux.log.success(microfrontend.name + " " + "Created " + pathAppsWithDist);
  }

  if (
    microOpts.forAllMicrofrontends.libraryForceUpdate ||
    microfrontend.libraryForceUpdate ||
    fsExtra.readdirSync(pathAppsWithDist)?.length === 0
  ) {
    fns.aux.log.warning(
      microfrontend.name +
        " " +
        pathAppsWithDist +
        " is empty, copying the original dist"
    );
    fsExtra.copySync(microOpts.pathLibraryDist, pathAppsWithDist);
    fns.aux.log.success(
      microfrontend.name + " " + "Copied to " + microOpts.pathLibraryDist
    );
  }

  /* ===================================================================
    INIT
  =================================================================== */

  /* ===================================================================
    Unlinking
  =================================================================== */

  if (microfrontend.updateFromBranch) {
    const stashName = "Linker stash " + new Date().now;
    fns.aux.executeSync(`git stash --save ${stashName}`);
  }

  fns.aux.log.info(microfrontend.name + " " + "Initializing...");
  fns.aux.executeSync("cd " + microfrontend.pathToWork);

  fns.aux.log.info(microfrontend.name + " " + "Unlinking...");
  fns.aux.executeSync("npm unlink " + microfrontend.linkName);

  /* ===================================================================
    Stashing
  =================================================================== */

  if (microfrontend.updateFromBranch) {
    const stashName = "Linker stash " + new Date().now;
    fns.aux.getCurrentBranchName().then((currentBranchName) => {
      fns.aux.executeSync(`git stash --save ${stashName}`);
      fns.aux.executeSync(`git checkout ${microfrontend.updateFromBranchName}`);
      fns.aux.executeSync(`git pull`);
      fns.aux.executeSync(`git checkout ${currentBranchName}`);
      fns.aux.executeSync(`git stash apply`);
    });
  }

  /* ===================================================================
    Node modules install
  =================================================================== */

  if (
    microOpts.forAllMicrofrontends.nodeModulesInstall ||
    microfrontend.nodeModulesInstall
  ) {
    fns.aux.log.info(microfrontend.name + " " + "Getting package");
    packageJsonOriginal = fsExtra.readJsonSync(pathPackageJson);
    packageJsonTemp = JSON.parse(JSON.stringify(packageJsonOriginal));

    fns.aux.log.info(microfrontend.name + " " + "Deleting library dependecy");
    if (!packageJsonTemp.dependencies?.[microfrontend.libraryName]) {
      fns.aux.log.fail(
        microfrontend.name +
          " " +
          microfrontend.libraryName +
          " not exist in dependencies of package.json"
      );
    }
    delete packageJsonTemp.dependencies[microfrontend.libraryName];
    fns.aux.writePackage(pathPackageJson, packageJsonTemp);

    fns.aux.log.info(microfrontend.name + " " + "Installing package dependencies");
    process.chdir(microfrontend.pathToWork);
    fns.aux.executeSync("npm install");

    fns.aux.log.info(microfrontend.name + " " + "Restoring original package.json");
    fns.aux.discardChangesInPackage(microfrontend.pathToWork);
  }

  /* ===================================================================
    POST INSTALL
  =================================================================== */

  fns.aux.log.info(microfrontend.name + " " + "Going to path");
  process.chdir(pathAppsWithDist);

  fns.aux.log.info(microfrontend.name + " " + "Linking...");
  fns.aux.executeSync("npm link");
  process.chdir(microfrontend.pathToWork);
  fns.aux.executeSync("npm link " + microfrontend.linkName);

  fns.aux.log.success(microfrontend.name + " " + "Link ended");
};
