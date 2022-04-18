const endpointsPokemons = require("./endpoints/pokemons");
const core = require("./functions/core");

function init() {
  core.callToEndPoints(endpointsPokemons);
}

init();
