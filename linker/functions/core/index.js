const prepare = require("./prepare");
const moveDist = require("./dist");
const unlink = require("./links");
const nodeModulesInstall = require("./modules");
const postInstall = require("./post-install");
const updateBranch = require("./git");

module.exports = {
  prepare: prepare,
  dist: moveDist,
  links: unlink,
  nModules: nodeModulesInstall,
  postInstall: postInstall,
  git: updateBranch,
};
