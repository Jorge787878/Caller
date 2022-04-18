const auxFn = require("../functions/auxiliars");

const endpoints = [
  auxFn.createEndpoint(
    {
      name: "pokemons",
      url: "https://pokeapi.co/api/v2/generation/3",
      folder: "./results",
    },
    [
      {
        method: "get",
        newFileName: "abilities",
        usePath: "abilities",
      },
      {
        usePath: "types",
      },
      {
        usePath: "pokemon_species",
      },
      {
        usePath: "names",
      },
      {
        usePath: "moves",
      },
    ]
  ),
];

module.exports = endpoints;
