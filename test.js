const core = require("./functions/core");
const aux = require("./functions/auxiliars");

const headers = {
  "ocp-apim-subscription-key": "311f4b451bf94524acb13b44b6bdbef8",
};

const endpoints = [
  aux.createEndpoint(
    {
      name: "support",
      url: "https://dev-api.iryo.eu/b2c/support",
      headers,
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

function init() {
  core.callToEndPoints(endpoints);
}

init();
