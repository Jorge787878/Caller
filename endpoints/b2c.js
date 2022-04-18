const aux = require("../functions/auxiliars");

const endpointB2cSupport = aux.createEndpointObj();

endpointB2cSupport.name = "support";
endpointB2cSupport.url = "https://dev-api.iryo.eu/b2c/support";
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

const endpoints = [aux.prepareEndpoint(endpointB2cSupport)];

module.exports = endpoints;
