const auxFn = require("../functions/auxiliars");

const endpoints = [
  auxFn.createEndpoint(
    "pokemons",
    "https://pokeapi.co/api/v2/generation/3",
    "./results",
    [
      {
        method: "get",
        file: "abilities",
        usePath: "data.abilities",
      },
      {
        usePath: "data.types",
      },
      {
        usePath: "data.pokemon_species",
      },
      {
        usePath: "data.names",
      },
      {
        usePath: "data.moves",
      },
    ]
  ),
];

module.exports = endpoints;
