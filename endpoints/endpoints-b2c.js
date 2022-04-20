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
callCountries.newFileName = "countries";
callCountries.usePath = "";

endpointB2cSupport.name = "support";
endpointB2cSupport.url = urlBase + "/support";
endpointB2cSupport.folder = "./results";
endpointB2cSupport.calls = [
  callCountries,
  {
    method: "get",
    endPoint: "/countries",
    newFileName: "countries-data",
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

/* ===================================================================
    B2C AVAILABILITY
  =================================================================== */

const endpointB2cAvailability = aux.createEndpointObj();

endpointB2cAvailability.name = "availability";
endpointB2cAvailability.url = urlBase + "/availability";
endpointB2cAvailability.folder = "./results";

/* SEARCH  */

const search = aux.createEndpointCallObj();
search.method = "post";
search.endPoint = "/search";
search.newFileName = "search";
search.usePath = "";
search.body = {
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
};

endpointB2cAvailability.calls.push(search);

endpoints.push(endpointB2cAvailability);

/* ===================================================================
    B2C BUILD
  =================================================================== */

const endpointB2cBuild = aux.createEndpointObj();

endpointB2cBuild.name = "build";
endpointB2cBuild.url = urlBase + "/build//bookings";
endpointB2cBuild.folder = "./results";

/* CUSTOMER RULES  */

const customerRules = aux.createEndpointCallObj();
customerRules.method = "get";
customerRules.endPoint = "/customer-rules";

endpointB2cBuild.calls.push(customerRules);

/* PASSENGER RULES  */

const passengerRules = aux.createEndpointCallObj();
passengerRules.method = "get";
passengerRules.endPoint = "/passenger-rules";

endpointB2cBuild.calls.push(passengerRules);

endpoints.push(endpointB2cBuild);

/* ===================================================================
    FIN
  =================================================================== */

module.exports = endpoints;
