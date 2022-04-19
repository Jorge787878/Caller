const axios = require("axios");
const fsExtra = require("fs-extra");
const aux = require("../functions/auxiliars");
const globalConfig = require("../config/global");

function callToEndPoint(preparedEndPoint, config) {
  if (!fsExtra.existsSync(preparedEndPoint.folder)) {
    fsExtra.mkdirSync(preparedEndPoint.folder);
  }

  preparedEndPoint.calls.forEach((call) => {
    const targetFolder = `${preparedEndPoint.folder}/${preparedEndPoint.name}`;

    if (
      fsExtra.existsSync(targetFolder) &&
      globalConfig.deleteFilesBeforeCall
    ) {
      fsExtra.removeSync(targetFolder);
    }
    if (!fsExtra.existsSync(targetFolder)) {
      fsExtra.mkdirSync(targetFolder);
    }

    const axiosParam = aux.toAxiosParam(call, config.headers);
    if (axiosParam.url.includes("build")) {
      delete axiosParam.data;
    }
    axios(axiosParam)
      .then((response) => {
        aux.onSuccesCallWriteData(response, call);
        aux.coLog().stateSuccess(`${preparedEndPoint.name} ${call.endPoint}`);
      })
      .catch((error) => {
        aux.coLog().stateFail(`${preparedEndPoint.name} ${call.endPoint}`);
      });
  });
}

function callToEndPoints(endpoints, config) {
  endpoints.forEach((endpoint) => {
    aux.prepareEndpointCalls(endpoint);
    callToEndPoint(endpoint, config);
  });
}

module.exports = {
  callToEndPoints,
};
