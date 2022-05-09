module.exports = function (microfrontend, microOpts) {
  const fsExtra = require("fs-extra");
  const aux = require("./functions/linker-aux");

  const pathPackageJson = microfrontend.pathToWork + "/package.json";
  let packageJsonOriginal;
  let packageJsonTemp;
  let pathAppsWithDist;

  /* ===================================================================
    Prepare
  =================================================================== */

  aux.log.info("Preparing " + microfrontend.name);
  for (const optName in microfrontend) {
    const optValue = microfrontend[optName];
    if (!optValue) {
      aux.log.fail(optName + " is not defined");
    }
  }

  aux.log.info(microfrontend.name + " " + "Preparing...");

  /** Cleanup: if the process fail then the last microfrontend clean his own package changes */
  process.on("exit", () =>
    aux.discardChangesInPackage(microfrontend.pathToWork)
  );

  pathAppsWithDist =
    microfrontend.pathToWork + microfrontend.folderContainerLibraryDistToLink;
  if (
    microOpts.forAllMicrofrontends.libraryForceUpdate ||
    microfrontend.libraryForceUpdate ||
    !fsExtra.existsSync(pathAppsWithDist)
  ) {
    aux.log.warning(
      microfrontend.name + " " + pathAppsWithDist + " not exist, creating..."
    );
    fsExtra.emptyDirSync(pathAppsWithDist);
    aux.log.success(microfrontend.name + " " + "Created " + pathAppsWithDist);
  }

  if (
    microOpts.forAllMicrofrontends.libraryForceUpdate ||
    microfrontend.libraryForceUpdate ||
    fsExtra.readdirSync(pathAppsWithDist)?.length === 0
  ) {
    aux.log.warning(
      microfrontend.name +
        " " +
        pathAppsWithDist +
        " is empty, copying the original dist"
    );
    fsExtra.copySync(microOpts.pathLibraryDist, pathAppsWithDist);
    aux.log.success(
      microfrontend.name + " " + "Copied to " + microOpts.pathLibraryDist
    );
  }

  /* ===================================================================
    INIT
  =================================================================== */

  aux.log.info(microfrontend.name + " " + "Initializing...");
  aux.executeSync("cd " + microfrontend.pathToWork);

  aux.log.info(microfrontend.name + " " + "Unlinking...");
  aux.executeSync("npm unlink " + microfrontend.linkName);

  if (
    microOpts.forAllMicrofrontends.nodeModulesInstall ||
    microfrontend.nodeModulesInstall
  ) {
    aux.log.info(microfrontend.name + " " + "Getting package");
    packageJsonOriginal = fsExtra.readJsonSync(pathPackageJson);
    packageJsonTemp = JSON.parse(JSON.stringify(packageJsonOriginal));

    aux.log.info(microfrontend.name + " " + "Deleting library dependecy");
    if (!packageJsonTemp.dependencies?.[microfrontend.libraryName]) {
      aux.log.fail(
        microfrontend.name +
          " " +
          microfrontend.libraryName +
          " not exist in dependencies of package.json"
      );
    }
    delete packageJsonTemp.dependencies[microfrontend.libraryName];
    aux.writePackage(pathPackageJson, packageJsonTemp);

    aux.log.info(microfrontend.name + " " + "Installing package dependencies");
    process.chdir(microfrontend.pathToWork);
    aux.executeSync("npm install");

    aux.log.info(microfrontend.name + " " + "Restoring original package.json");
    aux.discardChangesInPackage(microfrontend.pathToWork);
  }

  /* ===================================================================
    POST INSTALL
  =================================================================== */

  aux.log.info(microfrontend.name + " " + "Going to path");
  process.chdir(pathAppsWithDist);

  aux.log.info(microfrontend.name + " " + "Linking...");
  aux.executeSync("npm link");
  process.chdir(microfrontend.pathToWork);
  aux.executeSync("npm link " + microfrontend.linkName);

  aux.log.success(microfrontend.name + " " + "Link ended");
};
