module.exports = function (microfrontend, currentBranchName) {
  fns.aux.executeSync(`git stash --save 'Linker'`);
  fns.aux.executeSync(`git checkout ${microfrontend.updateFromBranchName}`);
  fns.aux.executeSync(`git pull`);
  fns.aux.executeSync(`git checkout ${currentBranchName}`);
  fns.aux.executeSync(`git stash apply`);
};
