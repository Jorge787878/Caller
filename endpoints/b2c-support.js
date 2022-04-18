const aux = require("../functions/auxiliars");

const endpoints = [
  aux.createEndpoint(
    {
      name: "support",
      url: "https://dev-api.iryo.eu/b2c/support",
      folder: "./results",
    },
    [
      {
        method: "get",
        endPoint: "/countries",
        newFileName: "countries-data",
        usePath: "data",
      },
      {
        endPoint: "/countries",
        newFileName: "countries",
      },
      {
        endPoint: "/provinces",
      },
      {
        endPoint: "/product-families",
      },
      {
        endPoint: "/product-types",
      },
      {
        endPoint: "/sales-presentations",
      },
    ]
  ),
];

module.exports = endpoints;
