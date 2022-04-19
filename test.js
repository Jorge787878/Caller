const aux = require("./functions/auxiliars");
const core = require("./functions/core");

const endpointB2c = aux.createEndpointObj();

endpointB2c.name = "support";
endpointB2c.url =
  "https://dev-api.iryo.eu/b2c/manage/bookings?target=NEXT&status=CONFIRMED&page=0";
endpointB2c.folder = "./results";

const countriesData = aux.createEndpointCallObj();
countriesData.method = "get";
countriesData.newFileName = "data";
countriesData.usePath = "data";

endpointB2c.calls.push(countriesData);

const endpoints = [aux.prepareEndpoint(endpointB2c)];

function callsB2c() {
  const config = aux.createNewConfig();

  config.headers["ocp-apim-subscription-key"] =
    "311f4b451bf94524acb13b44b6bdbef8";

  core.callToEndPoints(endpoints, config);
}

callsB2c();

// aux.coLog().stateSuccess('Funciona');
// aux.coLog().stateFail('Falla');
