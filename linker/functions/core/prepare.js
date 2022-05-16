module.exports = (function () {
  const fns = require("../../functions/index");
  const process = require("process");

  function prepare(microfrontend) {
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
  }

  return {
    prepare,
  };
})();
