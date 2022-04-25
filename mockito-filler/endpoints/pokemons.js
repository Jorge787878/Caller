const aux = require("../functions/auxiliars");

const baseUrl = "https://pokeapi.co/api/v2";

const endpointsPokemons = [];

endpointsPokemons.push(
  aux.createEndpointObj({
    name: "pokemons",
    url: baseUrl + "/generation/3",
    keepInFolder: "./results/pokemons",
    active: true,
    calls: [
      aux.createEndpointCallObj({
        method: "get",
        createNewFileName: "abilities-data",
        usePath: "abilities",
        active: true,
      }),
      aux.createEndpointCallObj({
        createNewFileName: "abilities",
        usePath: "abilities",
        active: true,
      }),
      aux.createEndpointCallObj({
        usePath: "types",
        active: true,
      }),
      aux.createEndpointCallObj({
        usePath: "names",
        active: true,
      }),
      aux.createEndpointCallObj({
        usePath: "moves",
        active: true,
      }),
      aux.createEndpointCallObj({
        usePath: "pokemon_species",
        active: true,
      }),
    ],
  })
);

endpointsPokemons.push(
  aux.createEndpointObj({
    name: "pokemons",
    url: baseUrl + "/pokemon",
    keepInFolder: "./results/pokemon",
    active: true,
    calls: [
      aux.createEndpointCallObj({
        endPoint: "/ditto",
        active: true,
      }),
      aux.createEndpointCallObj({
        endPoint: "/pikachu",
        active: true,
      }),
      aux.createEndpointCallObj({
        endPoint: "/eevee",
        active: false,
      }),
    ],
  })
);

endpointsPokemons.push(
  aux.createEndpointObj({
    name: "pokemons",
    url: baseUrl + "/pokemon",
    keepInFolder: "./results/pokemon",
    active: false,
    calls: [
      aux.createEndpointCallObj({
        endPoint: "/mew",
        active: true,
      }),
      aux.createEndpointCallObj({
        endPoint: "/arcanine",
        active: true,
      }),
    ],
  })
);

module.exports = endpointsPokemons;
