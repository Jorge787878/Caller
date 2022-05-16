const links = function() {
  
  function unlink(microfrontend) {
    const fns = require("../../functions/index");
    
    if (microfrontend.updateFromBranch) {
      const stashName = "Linker stash " + new Date().now;
      fns.aux.executeSync(`git stash --save ${stashName}`);
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
