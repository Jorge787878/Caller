const axios = require("axios");
const fsExtra = require("fs-extra");
const aux = require("../functions/auxiliars");

function callToEndPoint(params, config) {
  if (!fsExtra.existsSync(params.folder)) {
    fsExtra.mkdirSync(params.folder);
  }

  params.calls.forEach((call) => {
    const targetFolder = `${params.folder}/${params.name}`;

    fsExtra.removeSync(targetFolder);
    fsExtra.mkdirSync(targetFolder);

    params.url = call.endPoint;
    params.headers = config.headers;

    axios(params)
      .then((response) => {
        aux.onSuccesCallWriteData(response, call);
      })
      .catch(() => {
        console.error(`Error: ${params.name} ${call.endPoint}`);
      });
  });
}

function callToEndPoints(endpoints, config) {
  endpoints.forEach((endpoint) => {
    callToEndPoint(endpoint, config);
  });
}

module.exports = {
  callToEndPoints
};
