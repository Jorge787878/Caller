const prepare = require("./prepare");
const moveDist = require("./dist");
const unlink = require("./links");
const install = require("./modules");
const postInstall = require("./post-install");
const updateBranch = require("./git");

module.exports = {
  prepare: prepare,
  dist: moveDist,
  links: unlink,
  nModules: install,
  createLink: postInstall,
  git: updateBranch,
};
