const baseUrl = "https://pokeapi.co/api/v2";

const endpointsPokemons = [];
endpointsPokemons.push({
  name: "pokemons",
  url: baseUrl + "/generation/3",
  folder: "./results/pokemons",
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
});

endpointsPokemons.push({
  name: "pokemons",
  url: baseUrl + "/pokemon",
  folder: "./results/pokemon",
  calls: [
    {
      endPoint: "/ditto",
    },
    {
      endPoint: "/pikachu",
    },
  ],
});

module.exports = endpointsPokemons;
