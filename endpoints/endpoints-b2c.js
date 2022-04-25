const aux = require("../functions/auxiliars");
const constants = require("../constants/constants-b2c");

const urlBase = constants.URL_BASE;
const endpoints = [];

/* ===================================================================
    B2C SUPPORT
  =================================================================== */

const endpointB2cSupport = aux.createEndpointObj({
  active: true,
  name: "support",
  url: urlBase + "/support",
  keepInFolder: "./results/support",
  calls: [
    aux.createEndpointCallObj({
      method: "get",
      endPoint: "/countries",
      createNewFileName: "countries",
      active: true,
    }),
    aux.createEndpointCallObj({
      method: "get",
      endPoint: "/countries",
      active: true,
      createNewFileName: "countries-data",
      usePath: "data",
    }),
    aux.createEndpointCallObj({
      endPoint: "/product-families",
      active: true,
    }),
    aux.createEndpointCallObj({
      endPoint: "/product-types",
      active: true,
    }),
    aux.createEndpointCallObj({
      endPoint: "/sales-presentations",
      active: true,
    }),
  ],
});

endpoints.push(endpointB2cSupport);

/* ===================================================================
    B2C AVAILABILITY
  =================================================================== */

const endpointB2cAvailability = aux.createEndpointObj({
  name: "availability",
  url: urlBase + "/availability",
  keepInFolder: "./results/availability",
  active: true,
  calls: [
    aux.createEndpointCallObj({
      method: "post",
      endPoint: "/search",
      createNewFileName: "search",
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
    }),
  ],
});

endpoints.push(endpointB2cAvailability);

/* ===================================================================
B2C BUILD
=================================================================== */

const endpointB2cBuild = aux.createEndpointObj({
  name: "build",
  url: urlBase + "/build//bookings",
  keepInFolder: "./results/build",
  active: true,
  calls: [
    aux.createEndpointCallObj({
      endPoint: "/customer-rules",
      active: true,
    }),
    aux.createEndpointCallObj({
      endPoint: "/passenger-rules",
      active: true,
    }),
  ],
});

endpoints.push(endpointB2cBuild);

/* ===================================================================
  FIN
  =================================================================== */

module.exports = endpoints;
