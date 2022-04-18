const endpointsPokemons = require("../endpoints/pokemons");
const endpointsB2cSupport = require("../endpoints/b2c-support");

const core = require("./core");
const aux = require("./auxiliars");

function callsB2c() {
  const config = aux.createNewConfig();

  config.headers["ocp-apim-subscription-key"] =
    "311f4b451bf94524acb13b44b6bdbef8";

  core.callToEndPoints(endpointsB2cSupport, config);
}

function callsPokemons() {
  const config = aux.createNewConfig();
  
  core.callToEndPoints(endpointsPokemons, config);
}

module.exports = {
  callsB2c,
  callsPokemons,
};
