const aux = require("../functions/auxiliars");

const endpointsPokemons = aux.createEndpointObj();

endpointsPokemons.name = "pokemons";
endpointsPokemons.url = "https://pokeapi.co/api/v2/generation/3";
endpointsPokemons.folder = "./results";

const abilitiesData = aux.createEndpointCallObj();
abilitiesData.method = "get";
abilitiesData.newFileName = "abilities-data";
abilitiesData.usePath = "abilities";

const abilities = aux.createEndpointCallObj();
abilities.newFileName = "abilities";
abilitiesData.usePath = "abilities";

const types = aux.createEndpointCallObj();
types.usePath = "types";

const names = aux.createEndpointCallObj();
names.usePath = "names";

const moves = aux.createEndpointCallObj();
moves.usePath = "moves";

const pokemonSpecies = aux.createEndpointCallObj();
pokemonSpecies.usePath = "pokemon_species";

endpointsPokemons.calls.push(
  abilitiesData,
  abilities,
  types,
  names,
  moves,
  pokemonSpecies
);

const endpoints = [aux.prepareEndpoint(endpointsPokemons)];

module.exports = endpoints;
