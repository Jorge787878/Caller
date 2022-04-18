const endpoints = require("./endpoints/list");
const core = require("./functions/core");

function init() {
  core.callToEndPoints(endpoints);
}

init();
