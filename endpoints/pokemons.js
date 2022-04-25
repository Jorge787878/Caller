const baseUrl = "https://pokeapi.co/api/v2";

const endpointsPokemons = [];
endpointsPokemons.push({
  name: "pokemons",
  url: baseUrl + "/generation/3",
  folder: "./results/pokemons",
  active: true,
  calls: [
    {
      method: "get",
      createNewFileName: "abilities-data",
      usePath: "abilities",
      active: true,
    },
    {
      createNewFileName: "abilities",
      usePath: "abilities",
      active: true,
    },
    {
      usePath: "types",
      active: true,
    },
    {
      usePath: "names",
      active: true,
    },
    {
      usePath: "moves",
      active: true,
    },
    {
      usePath: "pokemon_species",
      active: true,
    },
  ],
});

endpointsPokemons.push({
  name: "pokemons",
  url: baseUrl + "/pokemon",
  folder: "./results/pokemon",
  active: true,
  calls: [
    {
      endPoint: "/ditto",
      active: true,
    },
    {
      endPoint: "/pikachu",
      active: true,
    },
    {
      endPoint: "/eevee",
      active: false,
    },
  ],
});

endpointsPokemons.push({
  name: "pokemons",
  url: baseUrl + "/pokemon",
  folder: "./results/pokemon",
  active: false,
  calls: [
    {
      endPoint: "/mew",
      active: true,
    },
  ],
});

module.exports = endpointsPokemons;
