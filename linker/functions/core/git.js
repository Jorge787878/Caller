const fns = require("../../functions/index");

const stash = {
  stash() {
    fns.aux.executeSync(`git stash --save 'Linker'`);
  },
  applyLastest() {
    fns.aux.executeSync(`git stash apply`);
  },
};

const checkout = {
  moveTobranch(name) {
    fns.aux.executeSync(`git checkout ${name}`);
  },
};

const actions = {
  pull() {
    fns.aux.executeSync(`git pull`);
  },
  discard: {
    packageJSONChanges() {
      fns.aux.executeSync("git checkout package.json");
      fns.aux.executeSync("git checkout package-lock.json");
    },
  },
};

function stashChangesAndPullFrom(branchName) {
  stash.stash();
  checkout.moveTobranch(branchName);
  actions.pull();
}

function backAndApplyLastestStash(branchName) {
  checkout.moveTobranch(branchName);
  stash.applyLastest();
  actions.discard.packageJSONChanges();
}

module.exports = {
  utils: {
    stash,
    checkout,
    actions,
  },
  stashChangesAndPullFrom,
  backAndApplyLastestStash,
};