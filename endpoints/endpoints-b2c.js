const aux = require("../functions/auxiliars");
const constants = require("../constants/constants-b2c");

const urlBase = constants.URL_BASE;
const endpoints = [];

/* ===================================================================
    B2C SUPPORT
  =================================================================== */

const endpointB2cSupport = aux.createEndpointObj();

const callCountries = aux.createEndpointCallObj();
callCountries.method = "get";
callCountries.endPoint = "/countries";
callCountries.createNewFileName = "countries";
callCountries.usePath = "";
callCountries.body = {};
callCountries.params = {};

endpointB2cSupport.name = "support";
endpointB2cSupport.url = urlBase + "/support";
endpointB2cSupport.folder = "./results/support";
endpointB2cSupport.calls = [
  callCountries,
  {
    method: "get",
    endPoint: "/countries",
    createNewFileName: "countries-data",
    usePath: "data",
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
];

endpoints.push(endpointB2cSupport);

/* ===================================================================
    B2C AVAILABILITY
  =================================================================== */

const endpointB2cAvailability = {
  name: "availability",
  url: urlBase + "/availability",
  folder: "./results/availability",
  calls: [
    {
      method: "post",
      endPoint: "/search",
      createNewFileName: "search",
      usePath: "",
      body: {
        currency: "EUR",
        passengers: [{ id: "passenger_1", type: "AD" }],
        travels: [
          {
            origin: "60000",
            destination: "71801",
            direction: "outbound",
            departure: "2022-04-19",
          },
          {
            origin: "71801",
            destination: "60000",
            direction: "inbound",
            departure: "2022-04-19",
          },
        ],
      },
    },
  ],
};

endpoints.push(endpointB2cAvailability);

/* ===================================================================
B2C BUILD
=================================================================== */

const endpointB2cBuild = {
  name: "build",
  url: urlBase + "/build//bookings",
  folder: "./results/build",
  calls: [
    {
      endPoint: "/customer-rules",
    },
    {
      endPoint: "/passenger-rules",
    },
  ],
};

endpoints.push(endpointB2cBuild);

/* ===================================================================
  FIN
  =================================================================== */

module.exports = endpoints;
