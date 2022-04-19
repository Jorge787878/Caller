const endpointsPokemons = require("../endpoints/pokemons");
const endpointsB2cSupport = require("../endpoints/endpoints-b2c");

const core = require("./core");
const aux = require("./auxiliars");

const configB2c = require("../config/config-b2c");

function callsB2c() {
  const config = aux.createNewConfig();

  config.headers = configB2c.HEADERS;

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
