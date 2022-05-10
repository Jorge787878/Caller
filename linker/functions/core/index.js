const prepare = require("./prepare");
const moveDist = require("./move-dist");
const unlink = require("./unlink");
const nodeModulesInstall = require("./node-modules");
const postInstall = require("./post-install");
const updateBranch = require("./update");

module.exports = {
  prepare,
  moveDist,
  unlink,
  nodeModulesInstall,
  postInstall,
  updateBranch,
};
