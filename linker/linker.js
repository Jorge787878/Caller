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

  fns.core.dist.move(microfrontend, fns.store.optionsExtra, pathAppsWithDist);

  /* ===================================================================
  Unlinking
  =================================================================== */

  fns.core.links.unlink(microfrontend);

  /* ===================================================================
    Stashing
  =================================================================== */

  if (microfrontend.updateFromBranch) {
    fns.aux.getCurrentBranchName().then((currentBranchName) => {
      fns.core.git.stashChangesAndPullFrom(currentBranchName);

      /* ===================================================================
      Node modules install
    =================================================================== */

      fns.core.nModules.install(
        microfrontend,
        microOpts,
        packageJsonOriginal,
        packageJsonTemp,
        pathPackageJson
      );

      /* ===================================================================
      Post install
    =================================================================== */

      fns.core.createLink(microfrontend, pathAppsWithDist);

      /* ===================================================================
      Create link
    =================================================================== */

      fns.core.git.backAndApplyLastestStash(currentBranchName);
    });
  } else {
    /* ===================================================================
      Node modules install
    =================================================================== */

    fns.core.nModules.install(
      microfrontend,
      microOpts,
      packageJsonOriginal,
      packageJsonTemp,
      pathPackageJson
    );

    /* ===================================================================
      Post install
    =================================================================== */

    fns.core.createLink.postInstall(microfrontend, pathAppsWithDist);
  }
};
