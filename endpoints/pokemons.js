const endpointsPokemons = [
  {
    name: "pokemons",
    url: "https://pokeapi.co/api/v2/generation/3",
    folder: "./results",
    calls: [
      {
        method: "get",
        createNewFileName: "abilities-data",
        usePath: "abilities",
      },
      {
        createNewFileName: "abilities",
        usePath: "abilities",
      },
      {
        usePath: "types",
      },
      {
        usePath: "names",
      },
      {
        usePath: "moves",
      },
      {
        usePath: "pokemon_species",
      },
    ],
  },
];

module.exports = endpointsPokemons;
