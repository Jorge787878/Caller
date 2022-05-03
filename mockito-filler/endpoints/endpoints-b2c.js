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
    aux.createEndpointCallObj({
      endPoint: "/stations",
      active: true,
    }),
    aux.createEndpointCallObj({
      endPoint: "/discountcard-types",
      active: true,
    }),
    aux.createEndpointCallObj({
      endPoint: "/passenger-types",
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
        cfgToken:
          "H4sIAAAAAAAA/52QTWvDMAyG/4vO8XBVO3Fy62CwwW4d7FDK8GebNV292D2MkP9epVu33QoFHx69lh5hD6C7DTTwuERZQgG2dVQZtMS93RK/PtwTp09L/PS8XLx9B7nd+5T1PlKMHJFxwVC98LqRdMSdkLzCuaxxGrYBmtVAM5P8PVHU5kw4LQwdNLk/+gJcTF8flyJF6p0X4H+ux+JvPvhfwzFueu38RRR0l2409d4cDrurotk/0ZqabaKnEbRd0i7SbwywO8uFks6WXDFTh8BEaSTTtTQMqypUUoeZ4grG8QShYOVggQEAAA==.MQosXZ7IyAy7Ru8Z4AmV7boN7QJL7yWZ9zgpS9/WgGg=",
        currency: "EUR",
        passengers: [
          {
            id: "passenger_1",
            type: "AD",
          },
          {
            id: "passenger_2",
            type: "AD",
          },
          {
            id: "passenger_3",
            type: "CH",
          },
          {
            id: "passenger_4",
            type: "IN",
          },
        ],
        travels: [
          {
            origin: "60000",
            destination: "71801",
            direction: "outbound",
            departure: "2022-12-29",
          },
          {
            origin: "71801",
            destination: "60000",
            direction: "inbound",
            departure: "2022-12-30",
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
B2C BUILD
=================================================================== */

const endpointB2cManage = aux.createEndpointObj({
  name: "manage",
  url: urlBase + "/manage",
  keepInFolder: "./results/manage",
  active: true,
  calls: [
    aux.createEndpointCallObj({
      endPoint: "/bookings",
      active: true,
      params: {
        target: "NEXT",
        status: "CONFIRMED",
        page: "0",
      },
    }),
  ],
});

endpoints.push(endpointB2cManage);

/* ===================================================================
  FIN
  =================================================================== */

module.exports = endpoints;
