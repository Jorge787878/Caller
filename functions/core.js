const axios = require("axios");
const fsExtra = require("fs-extra");
const aux = require("../functions/auxiliars");

function callToEndPoint(params, config) {
  if (!fsExtra.existsSync(params.folder)) {
    fsExtra.mkdirSync(params.folder);
  }

  params.headers = config.headers;

  params.calls.forEach((call) => {
    const targetFolder = `${params.folder}/${params.name}`;

    fsExtra.removeSync(targetFolder);
    fsExtra.mkdirSync(targetFolder);

    axios(call.endPoint, params)
      .then((response) => {
        aux.onSuccesCallWriteData(response, call);
      })
      .catch((error) => {
        console.error(`Error: ${params.name} ${call.endPoint}`, error);
      });
  });
}

function callToEndPoints(endpoints, config) {
  endpoints.forEach((endpoint) => {
    callToEndPoint(endpoint, config);
  });
}

module.exports = {
  callToEndPoints,
};
