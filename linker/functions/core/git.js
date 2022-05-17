class Gits {
  constructor() {
    this.fns = require("../index");
  }

  stash() {
    this.fns.aux.executeSync(`git stash save Linker`);
  }
  applyLastest() {
    this.fns.aux.executeSync(`git stash apply`);
  }

  moveTobranch(name) {
    this.fns.aux.executeSync(`git checkout ${name}`);
  }

  pull() {
    this.fns.aux.executeSync(`git pull`);
  }
  discard = {
    packageJSONChanges() {
      this.fns.aux.executeSync("git checkout package.json");
      this.fns.aux.executeSync("git checkout package-lock.json");
    },
  };

  stashChangesAndPullFrom(branchName) {
    this.stash();
    this.moveTobranch(branchName);
    this.pull();
  }

  backAndApplyLastestStash(branchName) {
    this.moveTobranch(branchName);
    this.applyLastest();
    this.discard.packageJSONChanges();
  }
}

module.exports = Gits;
