function postInstall(microfrontend, pathAppsWithDist) {
  const fns = require("../../functions/index");
  const process = require("process");

  fns.aux.log.info(microfrontend.name + " " + "Going to path");
  process.chdir(pathAppsWithDist);

  fns.aux.log.info(microfrontend.name + " " + "Linking...");
  fns.aux.executeSync("npm link");

  process.chdir(microfrontend.pathToWork);
  fns.aux.executeSync("npm link " + microfrontend.linkName);

  fns.aux.log.success(microfrontend.name + " " + "Link ended");
}

module.exports = {
  postInstall,
};
