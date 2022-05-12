module.exports = (function nodeModulesInstall() {
  const fsExtra = require("fs-extra");
  const process = require("process");
  const fns = require("./functions/index.js");

  function nodeModulesInstall(  microfrontend,
    microOpts,
    packageJsonOriginal,
    packageJsonTemp,
    pathPackageJson) {
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

      fns.aux.log.info(
        microfrontend.name + " " + "Installing package dependencies"
      );
      process.chdir(microfrontend.pathToWork);
      fns.aux.executeSync("npm install");

      fns.aux.log.info(
        microfrontend.name + " " + "Restoring original package.json"
      );
      fns.aux.discardChangesInPackage(microfrontend.pathToWork);
    }
  }

  return {
    nodeModulesInstall,
  };
})();
