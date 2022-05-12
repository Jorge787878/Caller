module.exports = function (microfrontend, microOpts) {
  const fns = require("./functions/index.js");

  const pathPackageJson = microfrontend.pathToWork + "/package.json";
  let packageJsonOriginal;
  let packageJsonTemp;
  let pathAppsWithDist;

  /* ===================================================================
    Prepare
  =================================================================== */

  fns.core.prepare(microfrontend);

  /* ===================================================================
    Moving dist
  =================================================================== */

  pathAppsWithDist =
    microfrontend.pathToWork + microfrontend.folderContainerLibraryDistToLink;

  fns.core.moveDist(microfrontend, microOpts, pathAppsWithDist);

  /* ===================================================================
  Unlinking
  =================================================================== */

  fns.core.unlink(microfrontend);

  /* ===================================================================
    Stashing
  =================================================================== */

  if (microfrontend.updateFromBranch) {
    fns.aux.getCurrentBranchName().then((currentBranchName) => {
      fns.core.updateFromBranch(microfrontend, currentBranchName);
    });
  }

  fns.core.

  /* ===================================================================
    Node modules install
  =================================================================== */

  fns.core.nodeModulesInstall(
    microfrontend,
    microOpts,
    packageJsonOriginal,
    packageJsonTemp,
    pathPackageJson
  );

  /* ===================================================================
    Post install
  =================================================================== */

  fns.core.postInstall(microfrontend, pathAppsWithDist);
};
