const links = function () {
  function unlink(microfrontend) {
    const fns = require("../../functions/index");
    const process = require("process");

    if (microfrontend.updateFromBranch) {
      process.chdir(microfrontend.pathToWork)
      fns.aux.executeSync(`git stash save Linker`);
      new fns.core.git().stashChangesAndPullFrom(microfrontend.updateFromBranchName)
    }

    fns.aux.log.info(microfrontend.name + " " + "Initializing...");
    fns.aux.executeSync("cd " + microfrontend.pathToWork);

    fns.aux.log.info(microfrontend.name + " " + "Unlinking...");
    fns.aux.executeSync("npm unlink " + microfrontend.linkName);
  }

  return {
    unlink,
  };
};

module.exports = links();
