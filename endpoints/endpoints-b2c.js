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
callCountries.active = true;
callCountries.body = {};
callCountries.params = {};

endpointB2cSupport.active = true;
endpointB2cSupport.name = "support";
endpointB2cSupport.url = urlBase + "/support";
endpointB2cSupport.folder = "./results/support";
endpointB2cSupport.calls = [
  callCountries,
  {
    method: "get",
    endPoint: "/countries",
    active: true,
    createNewFileName: "countries-data",
    usePath: "data",
  },
  {
    endPoint: "/product-families",
    active: true,
  },
  {
    endPoint: "/product-types",
    active: true,
  },
  {
    endPoint: "/sales-presentations",
    active: true,
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
  active: true,
  calls: [
    {
      method: "post",
      endPoint: "/search",
      createNewFileName: "search",
      usePath: "",
      active: true,
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
  active: true,
  calls: [
    {
      endPoint: "/customer-rules",
      active: true,
    },
    {
      endPoint: "/passenger-rules",
      active: true,
    },
  ],
};

endpoints.push(endpointB2cBuild);

/* ===================================================================
  FIN
  =================================================================== */

module.exports = endpoints;
