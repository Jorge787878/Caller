const axios = require("axios");
const fsExtra = require("fs-extra");
const aux = require("../functions/auxiliars");

function callToEndPoint(params) {
  if (!fsExtra.existsSync(params.folder)) {
    fsExtra.mkdirSync(params.folder);
  }
  params.calls.forEach((call) => {
    const targetFolder = `${params.folder}/${params.name}`;
    fsExtra.removeSync(targetFolder);
    fsExtra.mkdirSync(targetFolder);
    params.url = call.endPoint;

    axios(params)
      .then((response) => {
        aux.onSuccesCallWriteData(response, call);
      })
      .catch(() => {
        console.error(`Error: ${params.name} ${call.endPoint}`);
      });
  });
}

function callToEndPoints(endpoints) {
  endpoints.forEach((endpoint) => {
    callToEndPoint(endpoint);
  });
}

module.exports = {
  callToEndPoints,
};
