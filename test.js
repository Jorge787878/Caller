const { default: axios } = require("axios");
const aux = require("./functions/auxiliars");
const core = require("./functions/core");

const urlBase = "https://dev-api.iryo.eu/b2c";
const endpoints = [];

// const endpointB2c = aux.createEndpointObj();

// endpointB2c.name = "support";
// endpointB2c.url =
//   "https://dev-api.iryo.eu/b2c/manage/bookings?target=NEXT&status=CONFIRMED&page=0";
// endpointB2c.folder = "./results";

// const countriesData = aux.createEndpointCallObj();
// countriesData.method = "get";
// countriesData.newFileName = "data";
// countriesData.usePath = "data";

// endpointB2c.calls.push(countriesData);

// aux.prepareEndpointCalls(endpointB2c);

// const endpoints = [endpointB2c];

function callsB2c() {
  const config = aux.createNewConfig();

  config.headers["ocp-apim-subscription-key"] =
    "311f4b451bf94524acb13b44b6bdbef8";

  core.callToEndPoints(endpoints, config);
}

// callsB2c();

// aux.coLog().stateSuccess('Funciona');
// aux.coLog().stateFail('Falla');

/* ===================================================================
    B2C AVAILABILITY
  =================================================================== */

const endpointB2cAvailability = aux.createEndpointObj();

endpointB2cAvailability.name = "availability";
endpointB2cAvailability.url = "https://dev-api.iryo.eu/b2c/availability";
endpointB2cAvailability.folder = "./results";

const search = aux.createEndpointCallObj();
search.method = "post";
search.endPoint = "/search";
search.newFileName = "search";
search.usePath = "";
search.data = {
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

function callB2cAvailability() {
  const config = aux.createNewConfig();

  config.headers["ocp-apim-subscription-key"] =
    "311f4b451bf94524acb13b44b6bdbef8";

  //  config.data = {
  //    currency: "EUR",
  //    passengers: [{ id: "passenger_1", type: "AD" }],
  //    travels: [
  //      {
  //        origin: "60000",
  //        destination: "71801",
  //        direction: "outbound",
  //        departure: "2022-04-19",
  //      },
  //      {
  //        origin: "71801",
  //        destination: "60000",
  //        direction: "inbound",
  //        departure: "2022-04-19",
  //      },
  //    ],
  //  }
  //  config.method = 'post'

  //   axios
  //     (
  //       "https://dev-api.iryo.eu/b2c/availability/search",
  //       config
  //     )
  //     .then((a) => console.log(a.data))
  //     .catch((a) => console.log(a));

  core.callToEndPoints(endpoints, config);
}

callB2cAvailability();

// const axiosParam = aux.createAxiosParam();
// axiosParam.setMethod.get()
// console.log(axiosParam);