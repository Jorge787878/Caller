const aux = require("../functions/auxiliars");

const baseUrl = "https://pokeapi.co/api/v2";

const endpointsPokemons = [];

endpointsPokemons.push(
  aux.createUrl({
    name: "pokemons",
    url: baseUrl + "/generation/3",
    keepInFolder: "./results/pokemons",
    active: true,
    calls: [
      aux.createEndpoint({
        method: "get",
        createNewFileName: "abilities-data",
        usePath: "abilities",
        active: true,
      }),
      aux.createEndpoint({
        createNewFileName: "abilities",
        usePath: "abilities",
        active: true,
      }),
      aux.createEndpoint({
        usePath: "types",
        active: true,
      }),
      aux.createEndpoint({
        usePath: "names",
        active: true,
      }),
      aux.createEndpoint({
        usePath: "moves",
        active: true,
      }),
      aux.createEndpoint({
        usePath: "pokemon_species",
        active: true,
      }),
    ],
  })
);

endpointsPokemons.push(
  aux.createUrl({
    name: "pokemons",
    url: baseUrl + "/pokemon",
    keepInFolder: "./results/pokemon",
    active: true,
    calls: [
      aux.createEndpoint({
        endPoint: "/ditto",
        active: true,
      }),
      aux.createEndpoint({
        endPoint: "/pikachu",
        active: true,
      }),
      aux.createEndpoint({
        endPoint: "/eevee",
        active: false,
      }),
    ],
  })
);

endpointsPokemons.push(
  aux.createUrl({
    name: "pokemons",
    url: baseUrl + "/pokemon",
    keepInFolder: "./results/pokemon",
    active: false,
    calls: [
      aux.createEndpoint({
        endPoint: "/mew",
        active: true,
      }),
      aux.createEndpoint({
        endPoint: "/arcanine",
        active: true,
      }),
    ],
  })
);

module.exports = endpointsPokemons;
