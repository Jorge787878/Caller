module.exports = function (microfrontend, microOpts, pathAppsWithDist) {
  const fsExtra = require("fs-extra");
  const fns = require("../index");

  if (
    microOpts.forAllMicrofrontends.libraryForceUpdate ||
    microfrontend.libraryForceUpdate ||
    !fsExtra.existsSync(pathAppsWithDist)
  ) {
    fns.aux.log.warning(
      microfrontend.name + " " + pathAppsWithDist + " not exist, creating..."
    );
    fsExtra.emptyDirSync(pathAppsWithDist);
    fns.aux.log.success(
      microfrontend.name + " " + "Created " + pathAppsWithDist
    );
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
};
