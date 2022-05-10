const aux = require("./linker-aux");
const core = require("./core/index");
const store = require("./services/index");

module.exports = {
  aux,
  core,
  store: store.store,
};
