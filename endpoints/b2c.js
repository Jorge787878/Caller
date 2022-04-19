const aux = require("../functions/auxiliars");

const urlBase = "https://dev-api.iryo.eu/b2c";
const endpoints = [];

/* ===================================================================
    B2C SUPPORT
  =================================================================== */

const endpointB2cSupport = aux.createEndpointObj();

endpointB2cSupport.name = "support";
endpointB2cSupport.url = urlBase + "/support";
endpointB2cSupport.folder = "./results";

const countriesData = aux.createEndpointCallObj();
countriesData.method = "get";
countriesData.endPoint = "/countries";
countriesData.newFileName = "countries-data";
countriesData.usePath = "data";

const countries = aux.createEndpointCallObj();
countries.endPoint = "/countries";
countries.newFileName = "countries";

const productFamilies = aux.createEndpointCallObj();
productFamilies.endPoint = "/product-families";

const productTypes = aux.createEndpointCallObj();
productTypes.endPoint = "/product-types";

const salesPresentation = aux.createEndpointCallObj();
salesPresentation.endPoint = "/sales-presentations";

endpointB2cSupport.calls.push(
  countriesData,
  countries,
  productFamilies,
  productTypes,
  salesPresentation
);

aux.prepareEndpointCalls(endpointB2cSupport);

endpoints.push(endpointB2cSupport);

/* ===================================================================
    B2C AVAILABILITY
  =================================================================== */

const endpointB2cAvailability = aux.createEndpointObj();

endpointB2cAvailability.name = "availability";
endpointB2cAvailability.url = urlBase + "/availability";
endpointB2cAvailability.folder = "./results";

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

aux.prepareEndpointCalls(endpointB2cAvailability);

endpoints.push(endpointB2cAvailability);

/* ===================================================================
    B2C BUILD
  =================================================================== */

const endpointB2cBuild = aux.createEndpointObj();

endpointB2cBuild.name = "build";
endpointB2cBuild.url = urlBase + "/build//bookings";
endpointB2cBuild.folder = "./results";

/* CUSTOMER RULES  */

const sendTickets = aux.createEndpointCallObj();
sendTickets.method = "get";
sendTickets.endPoint = "/customer-rules";

endpointB2cBuild.calls.push(sendTickets);

aux.prepareEndpointCalls(endpointB2cBuild);

endpoints.push(endpointB2cBuild);

/* ===================================================================
    FIN
  =================================================================== */

module.exports = endpoints;
