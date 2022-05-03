const init = require("./functions/inits");

function initialize() {
  console.log(
    "/* **************************************************************"
  );
  console.log("  Initializing");
  console.log(
    " ************************************************************** */"
  );
  init.callsB2c();
  init.callsPokemons();
}

initialize();
